import { getConnection } from 'typeorm'
import * as request from 'supertest'
import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../src/app.module'

let app: INestApplication

export const createTestApp = async () => {
	if (app) return app
	const moduleFixture: TestingModule = await Test.createTestingModule({
		imports: [AppModule],
	}).compile()

	app = moduleFixture.createNestApplication()
	app.useGlobalPipes(new ValidationPipe())
	await app.init()
	return app
}

export const createTestingModule = () =>
	Test.createTestingModule({
		imports: [AppModule],
	}).compile()

export const closeTestApp = () => {
	return app.close()
}

export const call = () => request(app.getHttpServer())

export const registerUser = ({ email, fullname, password }) => {
	return call().post('/auth/register').send({
		fullname,
		email,
		password,
	})
}

export const loginUser = ({ email, password }) => {
	return call().post('/auth/login').send({
		email,
		password,
	})
}

export const getUserProfile = ({ accessToken }) => {
	return call().get('/users/me').set('Authorization', `Bearer ${accessToken}`)
}

export const cleanDB = async () => {
	const entities = getConnection().entityMetadatas
	const promises = []
	for (const entity of entities) {
		const repository = await getConnection().getRepository(entity.name)
		promises.push(repository.clear())
	}
	await Promise.all(promises)
}

export const registerUserGql = ({ email, fullname, password }) => {
	const query = `
          mutation {
            register (
              input: {
                email: "${email}",
                password: "${password}",
                fullname: "${fullname}"
              }
            ) {
                user {
                  id,
                  email,
                  fullname
                },
                accessToken
            }
          }`

	return call().post('/graphql').send({ query })
}

export const loginUserGql = ({ email, password }) => {
	const query = `
          mutation {
            login (
              input: {
                email: "${email}",
                password: "${password}",
              }
            ) {
                user {
                  id,
                  email,
                  fullname
                },
                accessToken
            }
          }`

	return call().post('/graphql').send({ query })
}

export const getUserProfileGql = ({ accessToken }) => {
	const query = `
          query {
            me {
              id,
              email,
              fullname
            }
          }`

	return call()
		.post('/graphql')
		.send({ query })
		.set('Authorization', `Bearer ${accessToken}`)
}
