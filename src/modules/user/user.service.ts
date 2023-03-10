import CreateUserDto from './dto/create-user.dto'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common/decorators'
import { compareSync } from 'bcryptjs'
import { BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { File } from 'multer'
import { env } from 'process'
import { multerRemove, multerSave } from '~/utils/multer.options'

@Injectable()
class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) {}

	public getAllUsers() {
		return this.userRepository.find()
	}

	public async createUser(createUserDto: CreateUserDto, photo: File) {
		const { email, name } = createUserDto
		const existUser = await this.userRepository.findOne({ where: [{ email }, { name }] })
		if (existUser) throw new HttpException('User credentials already exist', HttpStatus.CONFLICT)
		const photoSaved = multerSave(photo)
		const createUser = this.userRepository.create(createUserDto)
		if (photoSaved) {
			const photoUrl = `${env.DOMAIN_API}/api/images/${photoSaved.fileName}`
			createUser.photo = photoUrl
		}
		const isCreated = await createUser.save()
		if (!isCreated) {
			multerRemove({ fileName: photoSaved.fileName })
			throw new BadRequestException('Failed to create user')
		}
		return { name, email, photo: isCreated.photo }
	}

	public async validatePasswordUser(email: string, password: string) {
		const userExist = await this.userRepository
			.createQueryBuilder('user')
			.where({ email })
			.addSelect('user.password')
			.getOne()
		if (!userExist) return null
		const comparePassword = compareSync(password, userExist.password)
		if (!comparePassword || !userExist) throw new BadRequestException('Failed to login user')
		return userExist
	}

	public async getById(id: string) {
		const existUser = await this.userRepository.findOneBy({ id })
		if (!existUser) throw new NotFoundException('User not found')
		return existUser
	}
}
export default UserService
