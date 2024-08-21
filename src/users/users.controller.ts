import { Body,Controller,Post,Get,Patch,Param,Query,Delete, NotFoundException,Session } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@serialize(UserDto)

export class UsersController {
    constructor
    (    private usersService:UsersService
        ,private authService:AuthService)
    {}

    @Get('/colors/:color')
    setColor(@Param('color') color: string, @Session() session: any)
    {
        session.color = color;
    }

    @Get('/colors')
    getColor(@Session() session: any)
    {   
        return session.color;
    }

    @Post('/signup')
    createUser(@Body() body:CreateUserDto){
        this.authService.signup(body.email,body.password)
        console.log(body);
    }

    @Post('/signin')
    signin(@Body() body:CreateUserDto){
        this.authService.signin(body.email,body.password)
        console.log(body);
    }

    // @UseInterceptors(new SerializeInterceptor(UserDto))
    @Get('/:id')
    async findUser(@Param('id') id: string){
        const user = await this.usersService.findOne(parseInt(id));
        if(!user)
            throw new NotFoundException('User not found');
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email : string){
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id : number){
        return this.usersService.remove(id);
    }

    @Patch('/:id')
    updateUser(@Param('id') id: string, @Body() body:UpdateUserDto){
        this.usersService.update(parseInt(id),body)
        console.log(body);
    }


}
