import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import config from './config'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
		}),
		TypeOrmModule.forRootAsync({
			useFactory: async (configService: ConfigService) =>
				configService.get('ormconfig'),
			inject: [ConfigService],
		}),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			installSubscriptionHandlers: true,
			autoSchemaFile: 'schema.gql',
		}),
		UsersModule,
		AuthModule,
	],
})
export class AppModule {}
