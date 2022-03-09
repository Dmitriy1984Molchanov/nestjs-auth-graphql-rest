import {
	createTestApp,
	cleanDB,
	closeTestApp,
	loginUser,
	registerUser,
} from './helpers'
import { user } from './data'
const { email, fullname, password } = user

describe('AuthController (e2e)', () => {
	beforeAll(() => createTestApp())
	afterEach(() => cleanDB())
	afterAll(() => closeTestApp())

	describe('registration', () => {
		it('registers user', () =>
			registerUser(user)
				.expect(201)
				.expect(res => {
					expect(res.body).toEqual({
						user: {
							id: expect.any(Number),
							email,
							fullname,
						},
						accessToken: expect.any(String),
					})
				}))

		it('fails with empty fields', () =>
			registerUser({
				fullname: '',
				email: '',
				password: '',
			})
				.expect(400)
				.expect({
					statusCode: 400,
					message: [
						'email must be an email',
						'password should contain at least one number and one character',
						'password must be longer than or equal to 8 characters',
						'fullname must be longer than or equal to 5 characters',
					],
					error: 'Bad Request',
				}))

		it('fails with invalild fields', () =>
			registerUser({
				fullname: fullname.substring(0, 4),
				email: 'incorrect',
				password: fullname.substring(0, 7),
			})
				.expect(400)
				.expect({
					statusCode: 400,
					message: [
						'email must be an email',
						'password should contain at least one number and one character',
						'password must be longer than or equal to 8 characters',
						'fullname must be longer than or equal to 5 characters',
					],
					error: 'Bad Request',
				}))

		it('fails with a password containing only letters', () =>
			registerUser({
				fullname,
				email,
				password: 'onlyLettersPassword',
			})
				.expect(400)
				.expect({
					statusCode: 400,
					message: [
						'password should contain at least one number and one character',
					],
					error: 'Bad Request',
				}))

		it('fails with a password containing only digits', () =>
			registerUser({
				fullname,
				email,
				password: '12345678',
			})
				.expect(400)
				.expect({
					statusCode: 400,
					message: [
						'password should contain at least one number and one character',
					],
					error: 'Bad Request',
				}))

		describe('if user was registered before', () => {
			beforeAll(() => registerUser(user))

			it('fails', () =>
				registerUser(user)
					.expect(403)
					.expect({
						statusCode: 403,
						message: ['User already registered'],
						error: 'Forbidden',
					}))
		})
	})

	describe('login', () => {
		beforeAll(() => registerUser(user))

		it('logins user with correct data', () =>
			loginUser({
				email,
				password,
			})
				.expect(200)
				.expect(res => {
					expect(res.body).toEqual({
						user: {
							id: expect.any(Number),
							email,
							fullname,
						},
						accessToken: expect.any(String),
					})
				}))

		it('fails with incorrect email', () =>
			loginUser({
				email: 'incorrect' + email,
				password,
			})
				.expect(401)
				.expect({
					statusCode: 401,
					message: ['Credentials are incorrect'],
					error: 'Unauthorized',
				}))

		it('fails with incorrect password', () =>
			loginUser({
				email,
				password: 'incorrect',
			})
				.expect(401)
				.expect({
					statusCode: 401,
					message: ['Credentials are incorrect'],
					error: 'Unauthorized',
				}))

		it('fails with uppercase email', () =>
			loginUser({
				email: email.toUpperCase(),
				password,
			})
				.expect(401)
				.expect({
					statusCode: 401,
					message: ['Credentials are incorrect'],
					error: 'Unauthorized',
				}))
	})
})
