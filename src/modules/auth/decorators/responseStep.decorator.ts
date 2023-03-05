import { Res } from '@nestjs/common'

export function ResponseStep(): ParameterDecorator {
	return (target: any, key: string | symbol, index: number) => {
		const passthrough = true
		const responseDecorator = Res({ passthrough })
		responseDecorator(target, key, index)
	}
}
