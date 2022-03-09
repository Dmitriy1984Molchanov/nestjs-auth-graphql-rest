import { createTestingModule } from 'test/helpers'
import { AuthService } from './auth.service'

describe('AuthService', () => {
	let service: AuthService

	beforeEach(async () => {
		const module = await createTestingModule()
		service = module.get<AuthService>(AuthService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
