import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { RegisterAuthDto } from  './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User) private usersRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async register(user: RegisterAuthDto){
        
        const { email, phone } = user;
        const emailExist = await this.usersRepository.findOneBy({email: email})

        if(emailExist){
            // 409 CONFLICT
            throw new HttpException('El email ya esta registrado!', HttpStatus.CONFLICT);
        }

        const phoneExist = await this.usersRepository.findOneBy({phone: phone});

        if (phoneExist) {
            throw new HttpException('El telefono ya esta registrado', HttpStatus.CONFLICT)
        }


        const newUser = this.usersRepository.create(user);
        return this.usersRepository.save(newUser);
    }

    async login(loginData: LoginAuthDto){

        const { email, password } = loginData;
        const userFound = await this.usersRepository.findOneBy({ email: email })
        if (!userFound) {
            throw new HttpException('El email no existe', HttpStatus.NOT_FOUND);
        }

        const isPasswordValid = await compare(password, userFound.password);
        if (!isPasswordValid) {
            console.log('PASSWORD INCORRECTO');
            
            // 403 FORBITTEN access denied
            throw new HttpException('La contraseña es incorrecta', HttpStatus.FORBIDDEN);
        }

        const payload = { id: userFound.id, name:userFound.name };
        const token = this.jwtService.sign(payload);
        const data = {
            user: userFound,
            token: token
        }
        
        return data;

    }
}
