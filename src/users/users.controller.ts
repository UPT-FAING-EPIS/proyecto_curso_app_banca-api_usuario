import { Controller, Post, Body} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService){

    }

    @Post()
    createUser(@Body() newUser: CreateUserDto){
        this.UsersService.createUser(newUser)
    
    }

}
