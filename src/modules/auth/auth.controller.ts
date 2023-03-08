import RegisterAuthDto from './dto/registerAuth.dto'
import OAuthLayout from '~/utils/oauth.layout'
import LoginAuthDto from './dto/loginAuth.dto'
import GoogleAuthGuard from './guards/google.guard'
import geTokenAuthDto from './dto/geTokenAuth.dto'
import { UserRequest } from './decorators/user-request.decorator'
import { standardCookie } from '~/utils/standardCookie'
import { ResponseStep } from './decorators/responseStep.decorator'
import { Response } from 'express'
import { COOKIE_KEY } from '~/Utils/config'
import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('google')
	@UseGuards(GoogleAuthGuard)
	async auth() {}

	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	async googleRedirect(@UserRequest() user, @Res() res: Response) {
		const { token } = await this.authService.loginOauth(user)
		standardCookie({ res, value: token })
		res.status(200).send(OAuthLayout(token))
		return { msg: 'ok' }
	}

	@Post('register')
	protected register(@Body() createAuthDto: RegisterAuthDto) {
		return this.authService.register(createAuthDto)
	}

	@Post('login')
	protected async login(@Body() loginAuthDo: LoginAuthDto, @ResponseStep() res: Response) {
		const { token } = await this.authService.login(loginAuthDo)
		standardCookie({ res, value: token })
		return { msg: 'ok' }
	}

	@Post('logout')
	protected async logout(@Body() token: geTokenAuthDto, @ResponseStep() res: Response) {
		res.clearCookie(COOKIE_KEY)
		return this.authService.logout(token)
	}

	@Post('refresh')
	protected async refreshToken(@Body() refresh: geTokenAuthDto, @ResponseStep() res: Response) {
		const { token } = await this.authService.refreshToken(refresh)
		standardCookie({ res, value: token })
		return { msg: 'ok' }
	}
}

export default AuthController
