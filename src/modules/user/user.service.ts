import CreateUserDto from './dto/create-user.dto'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common/decorators'
import { compareSync } from 'bcryptjs'
import { BadRequestException, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'

@Injectable()
class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) {}

	public getAllUsers() {
		return this.userRepository.find()
	}

	public async createUser(createUserDto: CreateUserDto) {
		const { email, name } = createUserDto
		const existUser = await this.userRepository.findOne({ where: [{ email }, { name }] })
		if (existUser) throw new HttpException('User credentials already exist', HttpStatus.CONFLICT)
		const createUser = this.userRepository.create(createUserDto)
		const isCreated = await createUser.save()
		if (!isCreated) throw new BadRequestException('Failed to create user')
		return { name, email }
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
