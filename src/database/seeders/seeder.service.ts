import SeedUserService from './seed-user/seedUser.service'
import { Injectable, Logger } from '@nestjs/common'

@Injectable()
class SeederService {
	constructor(private readonly seedUserService: SeedUserService, private readonly logger: Logger) {}

	async resolve() {
		try {
			this.logger.log('[solving seeders] loading... 🚀')
			await this.seedUserService.generate()
		} catch (error) {
			this.logger.error('[fail solving seeders] ❌ error: ', error)
		}
	}
}
export default SeederService
