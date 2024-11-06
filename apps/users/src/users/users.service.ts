import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User,'mongodb_user') private UserDB:Repository<User>){}



  preCreate(createUserDto: CreateUserDto) {
    const user =  this.UserDB.create(createUserDto);
    if(!user){
      throw new BadRequestException('Bad structure body')
    }
    return user;
  }

  async doneCreate(user):Promise<User>{
    return await this.UserDB.save(user);
  }

  async findByEmail(email:string):Promise<User>{
    const user =await  this.UserDB.findOne({
      where:{email:email}
    })
    if (!user){
      throw new NotFoundException('email not found in database')
    }
    return user;
  }

  async findAll(): Promise<User[]> {
    //return this.UserModel.find().exec();

    return await this.UserDB.find() ;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
