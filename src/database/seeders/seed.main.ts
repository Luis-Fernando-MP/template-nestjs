import SeederService from './seeder.service'
import SeederModule from './seeder.module'
import { NestFactory } from '@nestjs/core'

async function bootstrap() {
	const app = await NestFactory.create(SeederModule)
	const seeder = app.get(SeederService)
	seeder.resolve().finally(() => app.close())
}
bootstrap()
