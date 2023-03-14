import { v2 as Cloudinary } from 'cloudinary'
import env, { CLOUD_PROVIDER } from '~/utils/config'

const CloudinaryProvider = {
	provide: CLOUD_PROVIDER,
	useFactory: () => {
		return Cloudinary.config({
			secure: true,
			cloud_name: env.CLOUDINARY_NAME,
			api_key: env.CLOUDINARY_API_KEY,
			api_secret: env.CLOUDINARY_API_SECRET
		})
	}
}

export default CloudinaryProvider
