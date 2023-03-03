import CreateUserDto from '~/modules/user/dto/create-user.dto'
import { OmitType } from '@nestjs/mapped-types'

export default class LoginAuthDto extends OmitType(CreateUserDto, ['name']) {}
