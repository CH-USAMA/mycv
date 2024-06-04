import { IsEmail } from 'class-validator';
import  { AfterRemove,AfterUpdate,AfterInsert,Entity,Column,PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    // @IsEmail()
    email : string;

    @Column()
    @Exclude()
    password : string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted user with id:', this.id);
    }

    @AfterUpdate()
    logUpdate() {
        console.log('Updateed user with id:', this.id);
    }

    @AfterRemove()
    logRemove() {
        console.log('Removeed user with id:', this.id);
    }
} 