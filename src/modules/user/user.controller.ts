import UserService from './user.service'
import { Controller, Get } from '@nestjs/common'

@Controller('user')
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	protected getAll() {
		return this.userService.getAllUsers()
	}
}

export default UserController
