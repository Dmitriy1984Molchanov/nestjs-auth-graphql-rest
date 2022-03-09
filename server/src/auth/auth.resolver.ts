import { UnauthorizedException, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { User } from '../users/entities/user.entity'
import { AuthService } from './auth.service'
import { GqlCurrentUser } from './decorator/gql-current-user.decorator'
import { LoginUserInput } from './dto/login-user.input'
import { LoginUserPayload } from './dto/login-user.payload'
import { RegisterUserInput } from './dto/register-user.input'
import { RegisterUserPayload } from './dto/register-user.payload'
import { GqlLocalAuthGuard } from './guards/gql-local-auth.guard'

@Resolver()
export class AuthResolver {
	constructor(private authService: AuthService) {}

	@UseGuards(GqlLocalAuthGuard)
	@Mutation(() => LoginUserPayload)
	async login(
		@Args('input') input: LoginUserInput,
		@GqlCurrentUser() user: User
	) {
		return {
			user,
			accessToken: await this.authService.generateAccessToken(user),
		}
	}

	@Mutation(() => RegisterUserPayload)
	async register(@Args('input') data: RegisterUserInput) {
		const user = await this.authService.register(data)

		if (!user) {
			return new UnauthorizedException([`User already exists.`])
		}

		const accessToken = await this.authService.generateAccessToken(user)

		const payload = new RegisterUserPayload()
		payload.user = user
		payload.accessToken = accessToken

		return payload
	}
}
