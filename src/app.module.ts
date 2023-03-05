import Modules from './modules'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { dataSourceOptions } from './database/dataSource'

@Module({
	imports: [TypeOrmModule.forRoot({ ...dataSourceOptions }), ...Modules]
})
class AppModule {}

export default AppModule
