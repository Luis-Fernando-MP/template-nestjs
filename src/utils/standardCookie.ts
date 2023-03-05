import { CookieOptions, Response } from 'express'
import { COOKIE_KEY } from './config'

type IStandardCookie = {
	res: Response
	value: any
	name?: string
	options?: CookieOptions
}

export const standardCookie = (params: IStandardCookie) => {
	const { name, value, res, options } = params
	const defaultOptions: CookieOptions = {
		httpOnly: true,
		secure: true,
		sameSite: 'strict',
		maxAge: 60 * 1000
	}
	res.cookie(name || COOKIE_KEY, value, { ...defaultOptions, ...options })
}
