import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes,scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);
@Injectable()

export class AuthService {
    constructor(private usersService: UsersService) {}

    async signup(email: string, password: string)
    {

        const users = await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('Email in use');
            }

        // hashing

        // generate a salt
        const salt = randomBytes(8).toString('hex');
        // hash the salt and the password 
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        // join salt and hashed result
        // const result = `${salt}.${hash.toString('hex')}`;
        const result = salt +'.'+hash.toString('hex');

        
        // creating user
        const user = await this.usersService.create(email, result);



        
        //logic for signup
        // see if email exist
        // hash the user password
        // create a new user
        // save and return
        return user;
        
    }

    async signin(email : string, password : string)
    {
        //logic for signin
        const [user] = await this.usersService.find(email);
        if(!user){
            throw new NotFoundException('user not found');
            }
            // hash the password
            const [salt, hashedPassword] = user.password.split('.');
            const hash = (await scrypt(password, salt, 32)) as Buffer;
            // compare the hashed password with the user hashed password
            if(hash.toString('hex') !== hashedPassword){
                throw new BadRequestException('Bad Password');
                }
                // return user
                console.log(user);
            return user;


    }
}
