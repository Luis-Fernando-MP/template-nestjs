import { config } from 'dotenv'
config()

const env = {
	PORT: Number(process.env.PORT)
}

export default env
