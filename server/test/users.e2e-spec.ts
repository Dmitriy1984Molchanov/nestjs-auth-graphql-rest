import {
	cleanDB,
	closeTestApp,
	createTestApp,
	getUserProfile,
	loginUser,
	registerUser,
} from './helpers'
import { user } from './data'
const { email, fullname } = user

describe('UsersController (e2e)', () => {
	let accessToken: string

	beforeAll(async () => {
		await createTestApp()
		await registerUser(user)
		;({ accessToken } = (await loginUser(user)).body)
	})
	afterAll(async () => {
		await cleanDB()
		await closeTestApp()
	})

	describe('user profile', () => {
		it('gets user profile', () =>
			getUserProfile({ accessToken })
				.expect(200)
				.expect(res => {
					expect(res.body).toEqual({
						id: expect.any(Number),
						email,
						fullname,
					})
				}))
	})
})
