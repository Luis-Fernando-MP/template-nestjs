import strategies from '../types/strategies.enum'
import { Reflector } from '@nestjs/core'
import { Observable, of } from 'rxjs'
import { IS_PUBLIC_KEY } from '../decorators/auth.decorator'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ExecutionContext } from '@nestjs/common/interfaces'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
class JwtAuthGuard extends AuthGuard(strategies.JWT) {
	constructor(private readonly reflector: Reflector) {
		super()
	}

	handleRequest(err: any, user: any) {
		if (err || !user)
			throw err || new UnauthorizedException('You need authorization to access, try again')
		return user
	}

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isPUblic = this.reflector.getAllAndOverride(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (isPUblic) return of(true)
		return super.canActivate(context)
	}
}
export default JwtAuthGuard
