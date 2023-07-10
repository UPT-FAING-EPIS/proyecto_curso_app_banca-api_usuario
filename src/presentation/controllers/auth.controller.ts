import {
  Body,
  Controller,
  Post,
  Res,
} from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'
import { RegisterAuthDto } from 'application/dtos/register-auth.dto'
import { LoginAuthDto } from 'application/dtos/login-auth.dto'
import { AuthUseCases } from 'application/use-cases/AuthUseCases'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authUseCases: AuthUseCases) {}

  @ApiOperation({ summary: 'Registro de usuario' })
  @ApiOkResponse({ description: 'Usuario registrado correctamente' })
  @ApiBadRequestResponse({ description: 'Error al registrar usuario' })
  @ApiBody({
    type: RegisterAuthDto,
  })
  @Post('register') // http://localhost/auth/register -> POST
  register(@Body() user: RegisterAuthDto) {
    return this.authUseCases.register(user)
  }

  @ApiOperation({ summary: 'Login de usuario' })
  @ApiOkResponse({ description: 'Usuario logueado correctamente' })
  @ApiBadRequestResponse({ description: 'Error al loguear usuario' })
  @ApiBody({
    type: LoginAuthDto,
  })
  @Post('login') // http://localhost/auth/login -> POST
  login(@Body() loginData: LoginAuthDto) {
    return this.authUseCases.login(loginData)
  }
}
