import env from '~/utils/config'
import { join } from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'
import { cwd } from 'process'

export const dataSourceOptions: DataSourceOptions = {
	username: env.DATABASE_USERNAME,
	type: env.DATABASE_TYPE as any,
	ssl: env.DATABASE_SSL,
	port: env.DATABASE_PORT,
	password: env.DATABASE_PASSWORD,
	migrationsTableName: '__migrations',
	migrationsRun: true,
	migrations: [join(cwd(), './migrations/*{.ts,.js}')],
	logging: ['error', 'migration', 'log', 'warn'],
	logger: 'advanced-console',
	host: env.DATABASE_HOST,
	entities: [join(__dirname + '/../**/*.entity{.ts,.js}')],
	database: env.DATABASE_NAME
	// dropSchema: true
	// synchronize: true
}

const dataSource = new DataSource(dataSourceOptions)
export default dataSource
