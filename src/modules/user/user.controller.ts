import UserService from './user.service'
import JwtAuthGuard from '../auth/guards/JwtAuth.guard'
import { UserRequest } from '../auth/decorators/user-request.decorator'
import { UserEntity } from './entities/user.entity'
import { PublicRoute } from '../auth/decorators/auth.decorator'
import { Controller, Get, UseGuards } from '@nestjs/common'

@UseGuards(JwtAuthGuard)
@Controller('user')
class UserController {
	constructor(private readonly userService: UserService) {}

	@PublicRoute()
	@Get()
	protected getAll(@UserRequest() userData: UserEntity) {
		return userData
		return this.userService.getAllUsers()
	}

	@Get('no-public')
	protected noPublic(@UserRequest() userData: UserEntity) {
		return { noPublic: '💔', user: userData }
	}
}

export default UserController
