import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>){}//auto create a type ORM Repository

        create(email : string, password : string){
            const user = this.repo.create({ email, password });
            return this.repo.save(user);
    }


    findOne(id: number) {
        if(!id)
            throw new NotFoundException('ID not found');
        
        return this.repo.findOne({ where: {id:id}});
    }

    find(email : string) {
        return this.repo.find({ where: {email:email}});
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');
            }
            Object.assign(user, attrs);
            return this.repo.save(user);

    }

    async remove(id:number) {
        const user = await this.findOne(id);
        console.log('Finding.....')
        if (!user) {
            throw new NotFoundException('user not found');
            }
            return this.repo.remove(user);
        
    }
}
