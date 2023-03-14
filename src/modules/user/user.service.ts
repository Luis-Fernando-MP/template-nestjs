import updateUserDto from './dto/update-user.dto'
import CreateUserDto from './dto/create-user.dto'
import CloudImageService from '../cloudinary/cloudinary.service'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common/decorators'
import { File } from 'multer'
import { defaultUserPhotoId, IUserEntity, UserEntity } from './entities/user.entity'
import { compareSync, genSalt, hash } from 'bcryptjs'
import { cloudCfgUserPhoto } from '../cloudinary/cloudinary.config'
import { BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { UploadApiResponse } from 'cloudinary'

@Injectable()
class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly cloudImageService: CloudImageService
	) {}

	public getAllUsers() {
		return this.userRepository.find()
	}

	public async createUser(createUserDto: CreateUserDto, photo?: File) {
		const { email, name } = createUserDto
		const existUser = await this.userRepository.findOne({ where: [{ email }, { name }] })
		if (existUser) throw new HttpException('User credentials already exist', HttpStatus.CONFLICT)
		const createUser = this.userRepository.create(createUserDto)
		if (photo) {
			const cloudPhoto = await this.cloudImageService.uploadStreamFile(photo, cloudCfgUserPhoto())
			createUser.photo = cloudPhoto.secure_url
			createUser.photo_id = cloudPhoto.public_id
		}
		const isCreated = await createUser.save()
		if (!isCreated) throw new BadRequestException('Failed to create user')
		return { name, email, photo: 'isCreated.photo' }
	}

	public async validatePasswordUser(email: string, password: string) {
		const userExist = await this.userRepository
			.createQueryBuilder('user')
			.where({ email })
			.addSelect('user.password')
			.getOne()
		if (!userExist) throw new HttpException("The user don't exist", HttpStatus.NOT_FOUND)
		const comparePassword = compareSync(password, userExist.password)
		if (!comparePassword || !userExist) throw new BadRequestException('Failed to login user')
		return userExist
	}

	public async getById(id: string) {
		const existUser = await this.userRepository.findOneBy({ id })
		if (!existUser) throw new NotFoundException('User not found')
		return existUser
	}

	public async delete({ photo_id, id }: UserEntity) {
		if (photo_id !== defaultUserPhotoId) await this.cloudImageService.deleteFile(photo_id)
		const deletedUser = await this.userRepository.delete(id)
		if (deletedUser.affected < 1)
			throw new HttpException(`fail to delete the user ${id}`, HttpStatus.NOT_MODIFIED)
		return { msg: 'ok' }
	}

	public async update(newUserData: updateUserDto, currentData: UserEntity, photoFile: File) {
		const { id, photo_id, name, photo } = currentData
		let updatePhoto: UploadApiResponse
		const photoExistAndIsDefault = photoFile && photo_id === defaultUserPhotoId
		const photoExistAndNotDefault = photoFile && photo_id !== defaultUserPhotoId
		if (photoExistAndIsDefault)
			updatePhoto = await this.cloudImageService.uploadStreamFile(photoFile, cloudCfgUserPhoto())
		if (photoExistAndNotDefault)
			updatePhoto = await this.cloudImageService.replaceStreamFile(
				photo_id,
				photoFile,
				cloudCfgUserPhoto()
			)
		const updateDataUser: Partial<IUserEntity> = {
			name: newUserData.name || name,
			photo: updatePhoto?.secure_url || photo,
			photo_id: updatePhoto?.public_id || photo_id
		}
		if (newUserData.password)
			updateDataUser.password = await hash(newUserData.password, await genSalt(10))
		const updatedUser = await this.userRepository.update(currentData.id, updateDataUser)
		if (!updatedUser)
			throw new HttpException(`fail to update the user ${id}`, HttpStatus.NOT_MODIFIED)
		return await this.getById(id)
	}
}

export default UserService
