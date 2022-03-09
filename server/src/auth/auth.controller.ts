import {
	Body,
	Controller,
	Post,
	Request,
	UseGuards,
	HttpCode,
} from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger'
import { UserDto } from '../users/dto/user.dto'
import { AuthService } from './auth.service'
import { LoginUserBody } from './dto/login-user.body'
import { LoginUserResponse } from './dto/login-user.response'
import { RegisterUserBody } from './dto/register-user.body'
import { RegisterUserResponse } from './dto/register-user.response'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	@ApiBody({ type: LoginUserBody })
	@ApiOkResponse({
		description: 'User has been logged in.',
		type: LoginUserResponse,
	})
	@HttpCode(200)
	async login(@Request() req) {
		return {
			user: new UserDto(req.user),
			accessToken: await this.authService.generateAccessToken(req.user),
		}
	}

	@Post('register')
	@ApiCreatedResponse({
		description: 'User has been registered.',
		type: RegisterUserResponse,
	})
	async register(@Body() data: RegisterUserBody) {
		const user = await this.authService.register(data)

		const accessToken = await this.authService.generateAccessToken(user)

		const payload = new RegisterUserResponse()
		payload.user = new UserDto(user)
		payload.accessToken = accessToken

		return payload
	}
}
