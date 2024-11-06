import {PrimaryGeneratedColumn , Column, Entity } from "typeorm";

@Entity()
export class UserAuth{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    email:string;

    @Column()
    password:string;

}
