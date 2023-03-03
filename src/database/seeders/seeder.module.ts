import Services from './services.index'
import { UserEntity } from '~/modules/user/entities/user.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Logger, Module } from '@nestjs/common'
import { dataSourceOptions } from '../dataSource'

@Module({
	imports: [TypeOrmModule.forRoot(dataSourceOptions), TypeOrmModule.forFeature([UserEntity])],
	providers: [Logger, ...Services]
})
export default class SeederModule {}
