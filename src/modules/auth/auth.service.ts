import UserService from '../user/user.service'
import TokenEntity from './entities/token.entity'
import RegisterAuthDto from './dto/registerAuth.dto'
import LoginAuthDto from './dto/loginAuth.dto'
import ITokenPayload from './types/payload.type'
import IOauthPayload from './types/oauthPayload.type'
import geTokenAuthDto from './dto/geTokenAuth.dto'
import { UserEntity } from '../user/entities/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common'
import { File } from 'multer'
import { BadRequestException, Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(TokenEntity) private readonly tokenRepository: Repository<TokenEntity>,
		@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
		private readonly userService: UserService,
		private readonly jwtService: JwtService
	) {}

	public async register(createAuthDto: RegisterAuthDto, photo: File) {
		const createdUser = await this.userService.createUser(createAuthDto, photo)
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

	public async loginOauth({ email, name, provider, photo }: IOauthPayload) {
		let currentUser = await this.userRepository.findOneBy({ email })
		if (currentUser) {
			const userHasToken = await this.tokenRepository.findOneBy({ user: { id: currentUser.id } })
			if (userHasToken) await this.tokenRepository.delete(userHasToken.id)
		} else {
			const newUser = this.userRepository.create({ email, name, provider, photo })
			const isUserCreated = await this.userRepository.save(newUser)
			if (!isUserCreated) throw new BadRequestException('Failed to create user')
			currentUser = isUserCreated
		}
		const token = await this.jwtService.signAsync({ id: currentUser.id })
		const createToken = this.tokenRepository.create({ token, user: currentUser })
		const saveToken = await this.tokenRepository.save(createToken)
		if (!saveToken) throw new BadRequestException('fail to generate token')
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
