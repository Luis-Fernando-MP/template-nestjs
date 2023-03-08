import UserModule from '../user/user.module'
import TokenEntity from './entities/token.entity'
import JwtAuthStrategy from './strategies/jwtAuth.strategy'
import GoogleStrategy from './strategies/google.strategy'
import env from '~/Utils/config'
import AuthController from './auth.controller'
import { UserEntity } from '../user/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PassportModule } from '@nestjs/passport'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { AuthService } from './auth.service'

@Module({
	imports: [
		UserModule,
		PassportModule,
		TypeOrmModule.forFeature([TokenEntity, UserEntity]),
		JwtModule.register({
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: '1h' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JwtAuthStrategy, GoogleStrategy]
})
export default class AuthModule {}
