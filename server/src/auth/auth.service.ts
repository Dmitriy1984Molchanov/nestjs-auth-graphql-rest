import { ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

type registerData = { email: string; password: string; fullname: string }

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService
	) {}

	async validateUser(email: string, password: string) {
		const user = await this.usersService.findOne({ email })
		if (user) {
			const { password: hashed, ...result } = user
			const match = await bcrypt.compare(password, hashed)
			if (match) {
				return result
			}
		}
		return null
	}

	async generateAccessToken(user: User) {
		const payload = { sub: String(user.id) }
		return this.jwtService.signAsync(payload)
	}

	async register({ email, password, fullname }: registerData) {
		let user = await this.usersService.findOne({ email })
		if (user) {
			throw new ForbiddenException(['User already registered'])
		}
		const hashed = await bcrypt.hash(password, 10)
		user = await this.usersService.create({
			email,
			password: hashed,
			fullname,
		})
		delete user.password
		return user
	}
}
