import { Module } from '@nestjs/common'
import CloudinaryProvider from './cloudinary.provider'
import CloudImageService from './cloudinary.service'

@Module({
	providers: [CloudinaryProvider, CloudImageService],
	exports: [CloudinaryProvider, CloudImageService]
})
class CloudinaryModule {}

export default CloudinaryModule
