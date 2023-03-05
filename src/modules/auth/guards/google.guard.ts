import strategies from '../types/strategies.enum'
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
class GoogleAuthGuard extends AuthGuard(strategies.GOOGLE) {
	constructor() {
		super({
			accessType: 'offline'
		})
	}
}

export default GoogleAuthGuard
