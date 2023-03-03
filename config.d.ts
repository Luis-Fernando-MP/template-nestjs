declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT: string
			DATABASE_TYPE: string
			DATABASE_HOST: string
			DATABASE_USERNAME: string
			DATABASE_PASSWORD: string
			DATABASE_NAME: string
			DATABASE_PORT: string
			DATABASE_SSL: string
		}
	}
}

export {}
