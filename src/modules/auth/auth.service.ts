import UserService from '../user/user.service'
import TokenEntity from './entities/token.entity'
import RegisterAuthDto from './dto/registerAuth.dto'
import LoginAuthDto from './dto/loginAuth.dto'
import ITokenPayload from './types/payload.type'
import geTokenAuthDto from './dto/geTokenAuth.dto'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>,
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	public async register(createAuthDto: RegisterAuthDto) {
		const createdUser = await this.userService.createUser(createAuthDto)
		if (!createdUser) throw new BadRequestException('failed to register user')
		return createdUser
	}

	public async login({ email, password }: LoginAuthDto) {
		const userExist = await this.userService.validatePasswordUser(email, password)
		const token = await this.jwtService.signAsync({ id: userExist.id })
		const existToken = await this.tokenRepository.findOneBy({ user: { id: userExist.id } })
		if (existToken) {
			const deleteToken = await this.tokenRepository.delete(existToken.id)
			if (deleteToken.affected < 1) throw new BadRequestException('failed to sign the token')
		}
		const createToken = this.tokenRepository.create({ token, user: userExist })
		const saveToken = await this.tokenRepository.save(createToken)
		if (!saveToken) throw new HttpException('fail to save token', HttpStatus.BAD_REQUEST)
		return { token }
	}

	public async logout({ token }: geTokenAuthDto) {
		const existToken = await this.findToken(token)
		const deleteToken = await this.tokenRepository.delete(existToken.id)
		if (deleteToken.affected < 1) throw new BadRequestException('logout failed')
		return { msg: 'ok' }
	}

	public async refreshToken({ token }: geTokenAuthDto) {
		try {
			const payload = this.jwtService.decode(token) as ITokenPayload
			if (!payload) throw new BadRequestException('Error to decode token')
			const user = await this.userService.getById(payload.id)
			if (!user) throw new NotFoundException('The user id is invalid')
			const newToken = await this.jwtService.signAsync({ id: user.id })
			const oldToken = await this.findToken(token)
			const updateToken = await this.tokenRepository.update(oldToken.id, { token: newToken, user })
			if (updateToken.affected < 1) throw new BadRequestException('Failed to update token')
			return { token: newToken }
		} catch (error) {
			throw new BadRequestException('Failed to refresh token')
		}
	}

	protected async findToken(token: string) {
		const existToken = await this.tokenRepository.findOneBy({ token })
		if (!existToken) throw new NotFoundException("failed token doesn't exist")
		return existToken
	}
}
