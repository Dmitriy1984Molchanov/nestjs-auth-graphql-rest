import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../app.module'
import { UsersController } from './users.controller'
import { UsersModule } from './users.module'

describe('UsersController', () => {
	let controller: UsersController

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [AppModule, UsersModule],
		}).compile()

		controller = module.get<UsersController>(UsersController)
	})

	it('should be defined', () => {
		expect(controller).toBeDefined()
	})
})
