import { Body,Controller,Post,Get,Patch,Param,Query,Delete, NotFoundException,Session,UseInterceptors,UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
// import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('auth')
@serialize(UserDto)
// @UseInterceptors(CurrentUserInterceptor)

export class UsersController {
    constructor
    (    private usersService:UsersService
        ,private authService:AuthService)
    {}


    @Get('whoami')
    @UseGuards(AuthGuard)
    getWhoAmI(@CurrentUser() user: User)
    {
        return user;    
    }
    
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

    // @Get('whoami')
    // getWhoAmI(@Session() session: any)
    // {
    //     return this.usersService.findOne(session.userId);    
    // }

  

    @Post('signout')
    signOut(@Session() session: any)
    {
        session.userId = null;
        return 'ok';
    }
  

    @Post('/signup')
    async createUser(@Body() body:CreateUserDto,@Session() session: any){
        const user = await this.authService.signup(body.email,body.password);
        session.userId = user.id;
        return user;
        // console.log(body);
    }

    @Post('/signin')
    async signin(@Body() body:CreateUserDto,@Session() session: any){
        const user = await this.authService.signin(body.email,body.password)
        console.log(body);
        session.userId = user.id;
        return user;
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
