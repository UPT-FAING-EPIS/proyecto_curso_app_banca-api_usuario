import { BlockUserCommandHandler } from './block-user.handler'
import { CreateUserCommandHandler } from './create-user.handler'
import { LoginAuthCommandHandler } from './login-auth.handler'
import { RegisterAuthCommandHandler } from './register-auth.handler'
import { UpdateUserCommandHandler } from './update-user.handler'

export const CommandHandlers = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  BlockUserCommandHandler,
  LoginAuthCommandHandler,
  RegisterAuthCommandHandler,
]
