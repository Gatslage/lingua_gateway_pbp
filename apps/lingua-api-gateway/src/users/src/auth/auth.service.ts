import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TokenUserDto } from './dto/token-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { GeneralUserDto,OutGeneralUserDto } from '../../general-user.dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@Inject('USERS_CLIENT') private UserClient: ClientProxy){}
  private Log = new Logger("Service: "+AuthService.name)

  async login(user:CreateAuthDto){
    this.Log.log("start method login")
  try{
    const log_result = await this.UserClient.send('users.auth.login',user)
    this.Log.log("end method login")
    return log_result;
  }catch(err){
    return err;
  }
  }

  register(user:GeneralUserDto){
    this.Log.log("method register(gateway)")
    return this.UserClient.send('users.auth.register',user)
  }

  create(createAuthDto: CreateAuthDto) {
    this.Log.log("method create  (gateway)")
    return 'This action adds a new auth';
  }

  findAll(data) {
    this.Log.log("method findAll(gateway)")
    try{
      const result = this.UserClient.send('users.auth.findAll',data);
    return result;
  }catch(err){
    return err;
  }
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
