import UserService from './user.service'
import UserController from './user.controller'
import CloudinaryModule from '../cloudinary/cloudinary.module'
import { UserEntity } from './entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

@Module({
	imports: [CloudinaryModule, TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [UserService],
	exports: [UserService]
})
class UserModule {}

export default UserModule
