import RegisterAuthDto from './dto/registerAuth.dto'
import LoginAuthDto from './dto/loginAuth.dto'
import geTokenAuthDto from './dto/geTokenAuth.dto'
import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	protected register(@Body() createAuthDto: RegisterAuthDto) {
		return this.authService.register(createAuthDto)
	}

	@Post('login')
	protected async login(@Body() loginAuthDo: LoginAuthDto) {
		return this.authService.login(loginAuthDo)
	}

	@Post('logout')
	protected async logout(@Body() token: geTokenAuthDto) {
		return this.authService.logout(token)
	}

	@Post('refresh')
	protected refreshToken(@Body() refresh: geTokenAuthDto) {
		return this.authService.refreshToken(refresh)
	}
}

export default AuthController
