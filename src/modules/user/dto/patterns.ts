const validateString = new RegExp(/^([a-zA-ZÁ-ÿ-9 -_])*$/)
const password = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%~^&*-]).{8,}$/)

const PATTERNS = {
	validateString: {
		pattern: validateString,
		msg: (value: string) => `The ${value} should not have any special characters`
	},
	password: {
		pattern: password,
		msg: 'password should have at least 1 uppercase letter, 1 lowercase letter along with a number and special character'
	}
}

export default PATTERNS
