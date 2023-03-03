import { IsJWT } from 'class-validator'

class geTokenAuthDto {
	@IsJWT()
	token: string
}
export default geTokenAuthDto
