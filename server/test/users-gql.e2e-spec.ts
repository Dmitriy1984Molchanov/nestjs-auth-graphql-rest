import {
	cleanDB,
	closeTestApp,
	createTestApp,
	getUserProfileGql,
	loginUserGql,
	registerUserGql,
} from './helpers'
import { user } from './data'
const { email, fullname } = user

describe('UsersController (e2e)', () => {
	let accessToken: string

	beforeAll(async () => {
		await createTestApp()
		await registerUserGql(user)
		;({ accessToken } = (await loginUserGql(user)).body.data.login)
	})
	afterAll(async () => {
		await cleanDB()
		await closeTestApp()
	})

	describe('user profile', () => {
		it('gets user profile', () =>
			getUserProfileGql({ accessToken })
				.expect(200)
				.expect(res => {
					expect(res.body.data.me).toEqual({
						id: expect.any(Number),
						email,
						fullname,
					})
				}))
	})
})
