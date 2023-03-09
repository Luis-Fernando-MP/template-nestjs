declare global {
	namespace NodeJS {
		interface ProcessEnv {
			CLIENT_CALLBACK: string
			PORT: string

			DATABASE_TYPE: string
			DATABASE_HOST: string
			DATABASE_USERNAME: string
			DATABASE_PASSWORD: string
			DATABASE_NAME: string
			DATABASE_PORT: string
			DATABASE_SSL: string

			JWT_SECRET: string
			COOKIE_SECRET: string

			GOOGLE_CLIENT_ID: string
			GOOGLE_CLIENT_SECRET: string
			GOOGLE_CALLBACK_URL: string

			GITHUB_CLIENT_ID: string
			GITHUB_CLIENT_SECRET: string
			GITHUB_CALLBACK_URL: string
		}
	}
}

export {}
