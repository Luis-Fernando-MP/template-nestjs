import UserModule from '../user/user.module'
import TokenEntity from './entities/token.entity'
import JwtAuthStrategy from './strategies/jwtAuth.strategy'
import GoogleStrategy from './strategies/google.strategy'
import GithubStrategy from './strategies/github.strategy'
import env from '~/Utils/config'
import CloudinaryModule from '../cloudinary/cloudinary.module'
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
		CloudinaryModule,
		PassportModule,
		TypeOrmModule.forFeature([TokenEntity, UserEntity]),
		JwtModule.register({
			secret: env.JWT_SECRET,
			signOptions: { expiresIn: '1h' }
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JwtAuthStrategy, GoogleStrategy, GithubStrategy]
})
export default class AuthModule {}
