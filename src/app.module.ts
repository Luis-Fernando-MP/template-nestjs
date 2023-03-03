import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'
import { dataSourceOptions } from './database/dataSource'
import Modules from './modules'
@Module({
	imports: [TypeOrmModule.forRoot({ ...dataSourceOptions }), ...Modules]
})
class AppModule {}

export default AppModule
