import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export interface UserPayload {
  sub: string
  email: string
}

export const CurrentUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()
    return request.user as UserPayload
  },
)
