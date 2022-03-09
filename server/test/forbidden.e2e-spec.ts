/* Tests for requests which require authentication */
import { user } from './data'
import {
	cleanDB,
	closeTestApp,
	createTestApp,
	loginUser,
	registerUser,
} from './helpers'
import { getUserProfile } from './helpers'
const requests = [getUserProfile]

describe('Forbidden', () => {
	beforeAll(() => createTestApp())
	afterAll(() => closeTestApp())

	describe('without authentication', () => {
		test.each(requests)('%s', request =>
			request({ accessToken: '' })
				.expect(401)
				.expect({ statusCode: 401, message: 'Unauthorized' })
		)
	})

	describe('after authentication with incorrect access token', () => {
		const accessToken = 'incorrect'
		beforeAll(async () => {
			await registerUser(user)
			await loginUser(user)
		})

		afterAll(() => cleanDB())

		test.each(requests)('%s', request =>
			request({ accessToken })
				.expect(401)
				.expect({ statusCode: 401, message: 'Unauthorized' })
		)
	})
})
