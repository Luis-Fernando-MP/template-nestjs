import Modules from './modules'
import AppController from './app.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MulterModule } from '@nestjs/platform-express'
import { MULTER_PATH } from './Utils/config'
import { Module } from '@nestjs/common'
import { dataSourceOptions } from './database/dataSource'

@Module({
	imports: [
		MulterModule.register({
			dest: MULTER_PATH
		}),
		TypeOrmModule.forRoot({ ...dataSourceOptions }),
		...Modules
	],
	controllers: [AppController]
})
class AppModule {}

export default AppModule
