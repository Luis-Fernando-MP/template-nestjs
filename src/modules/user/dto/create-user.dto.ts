import PATTERNS from './patterns'
import { IsEmail, IsNotEmpty, Length, Matches, MaxLength } from 'class-validator'

class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	@MaxLength(150)
	email: string

	@IsNotEmpty()
	@Length(8, 150)
	@Matches(PATTERNS.password.pattern, { message: PATTERNS.password.msg })
	password: string

	@IsNotEmpty()
	@Length(5, 100)
	@Matches(PATTERNS.validateString.pattern, { message: PATTERNS.validateString.msg('name') })
	name: string
}

export default CreateUserDto