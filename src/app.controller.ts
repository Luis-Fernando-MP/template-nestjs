import { Controller, Get, Param, Res } from '@nestjs/common'
import { Response } from 'express'
import { MULTER_PATH } from './Utils/config'

@Controller()
class AppController {
	@Get('images/:imagePath')
	seeUploadedFile(@Param('imagePath') image, @Res() res: Response) {
		return res.sendFile(image, { root: MULTER_PATH })
	}
}

export default AppController
