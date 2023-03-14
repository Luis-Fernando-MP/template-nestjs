declare global {
	namespace NodeJS {
		interface ProcessEnv {
			CLIENT_CALLBACK: string
			DOMAIN_API: string
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

			CLOUDINARY_NAME: string
			CLOUDINARY_API_KEY: string
			CLOUDINARY_API_SECRET: string
		}
	}
}

declare module 'multer' {
	type File = Express.Multer.File
}

export {}
