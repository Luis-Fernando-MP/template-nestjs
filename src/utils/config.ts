import { config } from 'dotenv'
config()

const env = {
	PORT: Number(process.env.PORT),
	DATABASE_HOST: process.env.DATABASE_HOST,
	DATABASE_NAME: process.env.DATABASE_NAME,
	DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
	DATABASE_PORT: Number(process.env.DATABASE_PORT),
	DATABASE_TYPE: process.env.DATABASE_TYPE,
	DATABASE_USERNAME: process.env.DATABASE_USERNAME,
	DATABASE_SSL: process.env.DATABASE_SSL != 'false',
	JWT_SECRET: process.env.JWT_SECRET,
	COOKIE_SECRET: process.env.COOKIE_SECRET,
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
	GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
	CLIENT_CALLBACK: process.env.CLIENT_CALLBACK
}

export const COOKIE_KEY = 'Authorization'

export default env
