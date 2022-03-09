import { createTestingModule } from 'test/helpers'
import { AuthResolver } from './auth.resolver'

describe('AuthResolver', () => {
	let resolver: AuthResolver

	beforeEach(async () => {
		const module = await createTestingModule()
		resolver = module.get<AuthResolver>(AuthResolver)
	})

	it('should be defined', () => {
		expect(resolver).toBeDefined()
	})
})
