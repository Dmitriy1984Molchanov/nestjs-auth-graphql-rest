import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, Matches, MinLength } from 'class-validator'

export class RegisterUserBody {
	@ApiProperty()
	@IsEmail()
	email: string

	@ApiProperty()
	@MinLength(8)
	@Matches(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)/, {
		message: 'password should contain at least one number and one character',
	})
	password: string

	@ApiProperty()
	@MinLength(5)
	fullname: string
}
