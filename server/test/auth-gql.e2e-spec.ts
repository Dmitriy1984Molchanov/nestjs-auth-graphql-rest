import {
	cleanDB,
	closeTestApp,
	createTestApp,
	loginUserGql,
	registerUserGql,
} from './helpers'
import { user } from './data'
const { email, fullname, password } = user

describe('AuthController (e2e) GQL', () => {
	beforeAll(() => createTestApp())
	afterEach(() => cleanDB())
	afterAll(() => closeTestApp())

	describe('registration', () => {
		it('registers user', () =>
			registerUserGql(user)
				.expect(200)
				.expect(res => {
					expect(res.body.data.register).toEqual({
						user: {
							id: expect.any(Number),
							email,
							fullname,
						},
						accessToken: expect.any(String),
					})
				}))

		it('fails with empty fields', () =>
			registerUserGql({
				email: '',
				password: '',
				fullname: '',
			})
				.expect(200)
				.expect(res => {
					expect(res.body.errors[0].extensions.response).toEqual({
						statusCode: 400,
						message: [
							'email must be an email',
							'password should contain at least one number and one character',
							'password must be longer than or equal to 8 characters',
							'fullname must be longer than or equal to 5 characters',
						],
						error: 'Bad Request',
					})
				}))

		it('fails with invalild fields', () =>
			registerUserGql({
				fullname: fullname.substring(0, 4),
				email: 'incorrect',
				password: fullname.substring(0, 7),
			})
				.expect(200)
				.expect(res => {
					expect(res.body.errors[0].extensions.response).toEqual({
						statusCode: 400,
						message: [
							'email must be an email',
							'password should contain at least one number and one character',
							'password must be longer than or equal to 8 characters',
							'fullname must be longer than or equal to 5 characters',
						],
						error: 'Bad Request',
					})
				}))

		describe('if user was registered before', () => {
			beforeAll(() => registerUserGql(user))

			it('fails', () =>
				registerUserGql(user)
					.expect(200)
					.expect(res => {
						expect(res.body.errors[0].extensions.response).toEqual({
							statusCode: 403,
							message: ['User already registered'],
							error: 'Forbidden',
						})
					}))
		})
	})

	describe('login', () => {
		beforeAll(() => registerUserGql(user))

		it('logins user with correct data', () =>
			loginUserGql({
				email,
				password,
			})
				.expect(200)
				.expect(res => {
					expect(res.body.data.login).toEqual({
						user: {
							id: expect.any(Number),
							email,
							fullname,
						},
						accessToken: expect.any(String),
					})
				}))

		it('fails with incorrect email', () =>
			loginUserGql({
				email: 'incorrect' + email,
				password,
			})
				.expect(200)
				.expect(res => {
					expect(res.body.errors[0].extensions.response).toEqual({
						message: ['Credentials are incorrect'],
						error: 'Unauthorized',
						statusCode: 401,
					})
				}))

		it('fails with incorrect password', () =>
			loginUserGql({
				email,
				password: 'incorrect',
			})
				.expect(200)
				.expect(res => {
					expect(res.body.errors[0].extensions.response).toEqual({
						message: ['Credentials are incorrect'],
						error: 'Unauthorized',
						statusCode: 401,
					})
				}))

		it('fails with uppercase email', () =>
			loginUserGql({
				email: email.toUpperCase(),
				password,
			})
				.expect(200)
				.expect(res => {
					expect(res.body.errors[0].extensions.response).toEqual({
						message: ['Credentials are incorrect'],
						error: 'Unauthorized',
						statusCode: 401,
					})
				}))
	})
})
