import { OmitType, PartialType } from '@nestjs/mapped-types'
import CreateUserDto from './create-user.dto'

export default class updateUserDto extends PartialType(OmitType(CreateUserDto, ['email'])) {}
