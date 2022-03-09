import { ExecutionContext, Injectable } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class GqlLocalAuthGuard extends AuthGuard('local') {
	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		const { req } = ctx.getContext()
		const { email, password } = ctx.getArgs().input
		req.body.email = email
		req.body.password = password
		return req
	}
}
