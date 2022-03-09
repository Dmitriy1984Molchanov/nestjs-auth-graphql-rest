import { Field, InputType } from '@nestjs/graphql'
import { IsEmail, Matches, MinLength } from 'class-validator'

@InputType()
export class RegisterUserInput {
	@Field()
	@IsEmail()
	email: string

	@Field()
	@MinLength(8)
	@Matches(/(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)/, {
		message: 'password should contain at least one number and one character',
	})
	password: string

	@Field()
	@MinLength(5)
	fullname: string
}
