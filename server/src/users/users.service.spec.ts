import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../app.module'
import { UsersModule } from './users.module'
import { UsersService } from './users.service'

describe('UsersService', () => {
	let service: UsersService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule, UsersModule],
		}).compile()

		service = module.get<UsersService>(UsersService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
