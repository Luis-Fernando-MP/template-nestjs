import users from './seedUser.data'
import { IUserEntity, UserEntity } from '~/modules/user/entities/user.entity'
import { Repository } from 'typeorm'
import { Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
class SeedUserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,
		private readonly logger: Logger
	) {}

	generate() {
		const creatingUsers = users.map(user => this.createUser(user))
		return Promise.all(creatingUsers)
	}

	async createUser(user: IUserEntity) {
		try {
			const { email, id, name } = user
			const userExist = await this.userRepository.findOneBy([{ id }, { name }, { email }])
			if (userExist) return
			const newUser = this.userRepository.create({ ...user })
			const userSaved = await this.userRepository.save(newUser)
			this.logger.verbose(`new user created: ${userSaved.name} - ${userSaved.id}`)
		} catch (error) {
			this.logger.error(error)
		}
	}
}

export default SeedUserService
