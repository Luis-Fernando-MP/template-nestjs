import UserModule from '../user/user.module'
import TokenEntity from './entities/token.entity'
import JwtAuthStrategy from './strategies/jwtAuth.strategy'
import env from '~/Utils/config'
import AuthController from './auth.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'

@Module({
	imports: [
		UserModule,
		TypeOrmModule.forFeature([TokenEntity]),
		JwtModule.register({
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: '1min' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JwtAuthStrategy]
})
export default class AuthModule {}
