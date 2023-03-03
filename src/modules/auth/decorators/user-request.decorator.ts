import { UserEntity } from '~/modules/user/entities/user.entity'
import { ExecutionContext } from '@nestjs/common/interfaces'
import { createParamDecorator } from '@nestjs/common'

export const UserRequest = createParamDecorator((_, ctx: ExecutionContext): UserEntity => {
	const request = ctx.switchToHttp().getRequest()
	const user = request.user as UserEntity
	return user
})
