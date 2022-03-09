import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'

interface FindAllArgs {
	relations?: string[]
}

interface FindOneArgs extends FindAllArgs {
	id?: number
	email?: string
}

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private usersRepository: Repository<User>
	) {}

	create(createUserInput: Partial<User>) {
		return this.usersRepository.save(createUserInput)
	}

	async findOne({ id, email }: FindOneArgs) {
		if (id) {
			return this.usersRepository.findOne(id)
		} else if (email) {
			return this.usersRepository
				.createQueryBuilder()
				.where('LOWER(email) = LOWER(:email)', { email })
				.getOne()
		} else {
			throw new Error('One of ID or email must be provided.')
		}
	}
}
