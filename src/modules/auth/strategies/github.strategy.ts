import strategies from '../types/strategies.enum'
import IOauthPayload from '../types/oauthPayload.type'
import env from '~/Utils/config'
import { Profile, Strategy } from 'passport-github2'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
class GithubStrategy extends PassportStrategy(Strategy, strategies.GITHUB) {
	constructor() {
		super({
			clientID: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET,
			callbackURL: env.GITHUB_CALLBACK_URL,
			scope: ['public_profile']
		})
	}

	async validate(_, __, { displayName, username, photos }: Profile) {
		const user: IOauthPayload = {
			provider: strategies.GITHUB,
			email: displayName,
			name: username,
			photo: photos[0].value
		}
		return user
	}
}

export default GithubStrategy
