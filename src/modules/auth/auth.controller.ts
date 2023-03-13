import RegisterAuthDto from './dto/registerAuth.dto'
import OAuthLayout from '~/utils/oauth.layout'
import multerOptions from '~/utils/multer.options'
import LoginAuthDto from './dto/loginAuth.dto'
import IOauthPayload from './types/oauthPayload.type'
import GoogleAuthGuard from './guards/google.guard'
import GithubAuthGuard from './guards/github.guard'
import geTokenAuthDto from './dto/geTokenAuth.dto'
import { UserRequest } from './decorators/user-request.decorator'
import { standardCookie } from '~/utils/standardCookie'
import { ResponseStep } from './decorators/responseStep.decorator'
import { Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express'
import { File } from 'multer'
import { COOKIE_KEY } from '~/Utils/config'
import { Controller, HttpException, HttpStatus, UseGuards, UseInterceptors } from '@nestjs/common'
import { Body, Get, Post, Res, UploadedFile } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Get('google')
	@UseGuards(GoogleAuthGuard)
	protected async authGoogle() {}

	@Get('google/redirect')
	@UseGuards(GoogleAuthGuard)
	protected async googleRedirect(@UserRequest() user: IOauthPayload, @Res() res: Response) {
		return this.oauthCallback(user, res)
	}

	@Get('github')
	@UseGuards(GithubAuthGuard)
	protected async authGithub() {}

	@Get('github/redirect')
	@UseGuards(GithubAuthGuard)
	protected async githubRedirect(@UserRequest() user: IOauthPayload, @Res() res: Response) {
		return this.oauthCallback(user, res)
	}

	protected async oauthCallback(user: IOauthPayload, res: Response) {
		try {
			const { token } = await this.authService.loginOauth(user)
			standardCookie({ res, value: token })
			res.status(200).send(OAuthLayout(new HttpException(token, HttpStatus.OK)))
			return { msg: 'ok' }
		} catch (error) {
			res.send(OAuthLayout(error, true))
		}
	}

	@Post('register')
	@UseInterceptors(FileInterceptor('photo', multerOptions))
	protected async register(@Body() createAuthDto: RegisterAuthDto, @UploadedFile() photo: File) {
		return this.authService.register(createAuthDto, photo)
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
