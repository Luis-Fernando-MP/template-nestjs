import UserService from './user.service'
import UserController from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { UserEntity } from './entities/user.entity'

@Module({
	imports: [TypeOrmModule.forFeature([UserEntity])],
	controllers: [UserController],
	providers: [UserService]
})
class UserModule {}

export default UserModule
