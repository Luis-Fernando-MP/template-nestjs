import strategies from '../types/strategies.enum'
import { Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
class GithubAuthGuard extends AuthGuard(strategies.GITHUB) {}

export default GithubAuthGuard
