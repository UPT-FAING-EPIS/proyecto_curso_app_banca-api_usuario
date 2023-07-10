import { BlockUserCommandHandler } from './block-user.handler'
import { CreateRoleCommandHandler } from './create-role.handler'
import { CreateUserCommandHandler } from './create-user.handler'
import { LoginAuthCommandHandler } from './login-auth.handler'
import { RegisterAuthCommandHandler } from './register-auth.handler'
import { UpdateUserCommandHandler } from './update-user.handler'
import { UpdateUserWithImageCommandHandler } from './update-user-with-image.handler'

export const CommandHandlers = [
  CreateUserCommandHandler,
  UpdateUserCommandHandler,
  BlockUserCommandHandler,
  LoginAuthCommandHandler,
  RegisterAuthCommandHandler,
  CreateRoleCommandHandler,
  UpdateUserWithImageCommandHandler,
]
