import env from './utils/config'
import AppModule from './app.module'
import { NestFactory } from '@nestjs/core'
import { Logger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.enableCors({ origin: '*', credentials: true })
	app.setGlobalPrefix('api')
	await app.listen(env.PORT)
	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true
		})
	)
	Logger.log(`🚀 server is running on port http://localhost:${env.PORT}/api`)
}
bootstrap()
