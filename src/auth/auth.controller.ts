import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @ApiOperation({ summary: 'Registro de usuario' })
    @ApiOkResponse({ description: 'Usuario registrado correctamente' })
    @Post('register') // http://localhost/auth/register -> POST
    register(@Body() user: RegisterAuthDto){
        return this.authService.register(user);
    }

    @ApiOperation({ summary: 'Login de usuario' })
    @ApiOkResponse({ description: 'Usuario logueado correctamente' })
    @Post('login') // http://localhost/auth/login -> POST 
    login(@Body() loginData: LoginAuthDto) {
        return this.authService.login(loginData);
    }
}
