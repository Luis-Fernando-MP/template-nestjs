import UserService from './user.service'
import updateUserDto from './dto/update-user.dto'
import multerOptions from '~/utils/multer.options'
import JwtAuthGuard from '../auth/guards/JwtAuth.guard'
import { UserRequest } from '../auth/decorators/user-request.decorator'
import { UserEntity } from './entities/user.entity'
import { Response } from 'express'
import { PublicRoute } from '../auth/decorators/auth.decorator'
import { FileInterceptor } from '@nestjs/platform-express'
import { File } from 'multer'
import { COOKIE_KEY } from '~/Utils/config'
import { Controller, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common'
import { Body, Delete, Get, Param, Put } from '@nestjs/common'

@UseGuards(JwtAuthGuard)
@Controller('user')
class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@PublicRoute()
	protected async getAll() {
		return { users: await this.userService.getAllUsers() }
	}

	@Get('/:id')
	@PublicRoute()
	protected getById(@Param('id') id: string) {
		return this.userService.getById(id)
	}

	@Delete()
	protected async delete(@UserRequest() user: UserEntity, @Res() res: Response) {
		const userIsRemoved = await this.userService.delete(user)
		res.clearCookie(COOKIE_KEY).status(200).json(userIsRemoved)
	}

	@Put()
	@UseInterceptors(FileInterceptor('photo', multerOptions))
	protected async update(
		@Body() updateUser: updateUserDto,
		@UserRequest() user: UserEntity,
		@UploadedFile() photo: File
	) {
		return this.userService.update(updateUser, user, photo)
	}
}

export default UserController
