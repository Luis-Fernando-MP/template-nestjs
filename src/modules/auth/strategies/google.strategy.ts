import strategies from '../types/strategies.enum'
import IOauthPayload from '../types/oauthPayload.type'
import env from '~/Utils/config'
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

@Injectable()
class GoogleStrategy extends PassportStrategy(Strategy, strategies.GOOGLE) {
	constructor() {
		super({
			clientID: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
			callbackURL: env.GOOGLE_CALLBACK_URL,
			scope: ['profile', 'email']
		})
	}

	async validate(_, __, { name, emails, photos }: Profile, done: VerifyCallback) {
		const userName = `${name.givenName} ${name.familyName}`.replace('undefined', '')
		const user: IOauthPayload = {
			provider: strategies.GOOGLE,
			email: emails[0].value,
			name: userName,
			photo: photos[0].value
		}
		done(null, user)
	}
}

export default GoogleStrategy
