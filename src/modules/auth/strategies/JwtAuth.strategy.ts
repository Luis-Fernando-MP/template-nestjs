import UserService from '~/modules/user/user.service'
import TPayload from '../types/payload.type'
import strategies from '../types/strategies.enum'
import env from '~/Utils/config'
import { UserEntity } from '~/modules/user/entities/user.entity'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
class JwtAuthStrategy extends PassportStrategy(Strategy, strategies.JWT) {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: env.JWT_SECRET
		})
	}

	async validate({ id }: TPayload) {
		const user = await this.userService.getById(id)
		if (!user) throw new UnauthorizedException()
		return user as UserEntity
	}
}

export default JwtAuthStrategy
