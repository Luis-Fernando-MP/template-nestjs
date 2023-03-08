import UserService from '~/modules/user/user.service'
import TPayload from '../types/payload.type'
import strategies from '../types/strategies.enum'
import env, { COOKIE_KEY } from '~/Utils/config'
import { UserEntity } from '~/modules/user/entities/user.entity'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Request } from 'express'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'

@Injectable()
class JwtAuthStrategy extends PassportStrategy(Strategy, strategies.JWT) {
	constructor(private readonly userService: UserService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				ExtractJwt.fromAuthHeaderAsBearerToken(),
				JwtAuthStrategy.extractJWT
			]),
			ignoreExpiration: false,
			secretOrKey: env.JWT_SECRET
		})
	}

	async validate(payload: TPayload) {
		if (!payload) throw new UnauthorizedException()
		const user = await this.userService.getById(payload.id)
		if (!user) throw new UnauthorizedException()
		return user as UserEntity
	}

	private static extractJWT({ cookies }: Request): string | null {
		if (!cookies[COOKIE_KEY]) return null
		return cookies[COOKIE_KEY]
	}
}

export default JwtAuthStrategy
