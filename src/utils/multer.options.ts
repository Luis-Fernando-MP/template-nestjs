import { v4 as uuid } from 'uuid'
import { unlink } from 'fs/promises'
import { MULTER_PATH } from './config'
import { File, Options } from 'multer'
import { extname, join } from 'path'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { cwd } from 'process'
import { BadRequestException } from '@nestjs/common'

const fileFilter = (_, { mimetype }: File, done: any) => {
	if (mimetype.match(/\/(jpg|jpeg|png|gif)$/)) return done(null, true)
	const badRequest = new BadRequestException(`Unsupported file type ${mimetype}`)
	done(badRequest, false)
}

export const multerSave = (file: File) => {
	if (!file) return
	try {
		const destinationExist = existsSync(MULTER_PATH)
		if (!destinationExist) mkdirSync(MULTER_PATH)
		const { originalname, buffer } = file
		const fileSimpleName = originalname.split('.')[0]
		const fileExtension = extname(originalname)
		const fileRandomName = uuid()
		const fileName = `${fileSimpleName}-${fileRandomName}${fileExtension}`
		const path = join(cwd(), MULTER_PATH, fileName)
		writeFileSync(path, buffer)
		return { ...file, fileName }
	} catch (err) {
		throw new BadRequestException(`Failed to create file ~> error: `, err)
	}
}

export const multerRemove = ({ fileName }: { fileName: string }) => {
	setTimeout(async () => {
		const originPath = join(cwd(), MULTER_PATH, fileName)
		try {
			await unlink(originPath)
		} catch (err) {
			throw new BadRequestException(`Fail to delete the file: ${originPath} ~> error: `, err)
		}
	}, 1000)
}

const multerOptions: Options = {
	limits: { fileSize: 3 * 1000000 },
	fileFilter
}

export default multerOptions
