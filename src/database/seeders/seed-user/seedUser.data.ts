import { faker } from '@faker-js/faker/locale/es'
import { IUserEntity } from '~/modules/user/entities/user.entity'

const generateUser = (): IUserEntity => {
	const name = faker.name.firstName()
	const email = faker.internet.email(name)
	const password = `Aa1#${name}`
	return { name, email, password }
}

const generateUsers = (count: number): Array<IUserEntity> =>
	Array.from({ length: count }, generateUser)

export default generateUsers(4)
