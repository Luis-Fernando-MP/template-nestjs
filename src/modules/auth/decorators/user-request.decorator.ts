import { UserEntity } from '~/modules/user/entities/user.entity'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import IOauthPayload from '../types/oauthPayload.type'

export const UserRequest = createParamDecorator((_, ctx: ExecutionContext) => {
	const request = ctx.switchToHttp().getRequest()
	const user = request.user as UserEntity | IOauthPayload
	return user
})
