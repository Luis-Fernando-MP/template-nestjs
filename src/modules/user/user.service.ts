import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common/decorators'

@Injectable()
class UserService {
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>
	) {}

	public getAllUsers() {
		return this.userRepository.find()
	}
}
export default UserService
