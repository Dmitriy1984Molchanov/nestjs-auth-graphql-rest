import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	app.useGlobalPipes(new ValidationPipe())
	const configService = app.get(ConfigService)

	const swaggerConfig = new DocumentBuilder()
		.setTitle('App documentation')
		.setDescription('API for the Recog Swiss school forum.')
		.setVersion('1.0')
		.addTag('forum')
		.build()
	const document = SwaggerModule.createDocument(app, swaggerConfig)
	SwaggerModule.setup('api', app, document)

	await app.listen(configService.get('port'))
}
bootstrap()
