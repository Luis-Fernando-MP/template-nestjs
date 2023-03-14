import { UploadApiOptions } from 'cloudinary'
import { CLOUD_DIRECTORY } from '~/Utils/config'

export const cloudCfnFolder = (folder = '') => `${CLOUD_DIRECTORY}/${folder || ''}`

export const cloudCfgMark = (options: UploadApiOptions = {}) => {
	const mark = {
		overlay: {
			type: 'fetch',
			url: 'https://res.cloudinary.com/dkbp71nof/image/upload/v1678507480/personal/plain-logo_awvyay.svg'
		},
		gravity: 'south_east',
		x: 10,
		y: 10,
		width: 120,
		opacity: 100
	}
	return { ...mark, ...options }
}

export const cloudCfgDefault = (options: UploadApiOptions = {}): UploadApiOptions => {
	const defaultOptions = {
		transformation: [
			{
				responsive: true,
				crop: 'fit',
				format: 'webp',
				quality: 'auto',
				effect: 'saturation:50',
				flags: 'progressive:semi',
				fetch_format: 'auto',
				resource_type: 'image'
			}
		]
	}
	return { ...defaultOptions, ...options, folder: cloudCfnFolder(options?.folder) }
}

export const cloudCfgUserPhoto = (options: UploadApiOptions = {}) => {
	const userConfig = {
		tags: ['user_photo'],
		folder: 'users',
		width: 300,
		height: 300,
		crop: 'fit'
	}
	return { ...userConfig, ...options }
}
