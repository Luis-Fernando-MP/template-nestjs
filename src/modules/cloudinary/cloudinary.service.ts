import { UploadApiResponse, v2 as cloudinary } from 'cloudinary'
import { UploadApiOptions } from 'cloudinary'
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { File } from 'multer'
import { cloudCfgDefault, cloudCfnFolder } from './cloudinary.config'

@Injectable()
class CloudImageService {
	public uploadStreamFile(file: File, options?: UploadApiOptions) {
		const cloudConfig = cloudCfgDefault(options)
		return this.resolveStreamPromiseCloud<UploadApiResponse>(file, cloudConfig)
	}

	public async replaceStreamFile(oldPublicId: string, file: File, options?: UploadApiOptions) {
		const replaceFileOptions = cloudCfgDefault({
			...options,
			overwrite: true,
			public_id: oldPublicId,
			invalidate: true
		})
		delete replaceFileOptions.folder
		return this.resolveStreamPromiseCloud<UploadApiResponse>(file, replaceFileOptions)
	}

	public uploadUrlFile(url: string, options?: UploadApiOptions) {
		const cloudConfig = cloudCfgDefault(options)
		const uploadFileCallback = cloudinary.uploader.upload(url, cloudConfig)
		return this.resolvePromiseCloud<UploadApiResponse>(uploadFileCallback)
	}

	public deleteFile(publicId: string) {
		const deleteFileCallback = cloudinary.uploader.destroy(publicId, { invalidate: true })
		return this.resolvePromiseCloud<UploadApiResponse>(deleteFileCallback)
	}

	public renameFile(publicId: string, newName: string) {
		const renameFileCallback = cloudinary.uploader.rename(publicId, newName, { invalidate: true })
		return this.resolvePromiseCloud<UploadApiResponse>(renameFileCallback)
	}

	public updateFile(publicId: string, options: UploadApiOptions) {
		const updateFileCallback = cloudinary.uploader.explicit(publicId, {
			...options,
			folder: cloudCfnFolder(options?.folder)
		})
		return this.resolvePromiseCloud<UploadApiResponse>(updateFileCallback)
	}

	public resolvePromiseCloud<T>(promise: Promise<T>) {
		return new Promise<T>((resolve, reject) => {
			promise
				.then(res => resolve(res))
				.catch(err => {
					const badError = new InternalServerErrorException(
						`Error in the transfer with cloudinary`,
						err.message
					)
					reject(badError)
				})
		})
	}

	public resolveStreamPromiseCloud<T>(file: File, options: UploadApiOptions = {}) {
		return new Promise<T>((resolve, reject) => {
			const uploadStream = cloudinary.uploader.upload_stream(options, (err, res) => {
				const badError = new InternalServerErrorException(`Error in the transfer with cloudinary`)
				if (err) return reject(badError)
				resolve(res as any)
			})
			uploadStream.end(file.buffer)
		})
	}
}

export default CloudImageService
