import { Body, Controller, Inject, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GeneralUserDto } from '../general-user.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { ValidateToken } from './interceptors/auth.interceptor';

@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}


    @MessagePattern('users.auth.register')
    subcribe(@Payload() newUser:GeneralUserDto){
        return this.AuthService.register(newUser);
    }

    @MessagePattern('users.auth.login')
    login(@Payload() user:CreateAuthDto){
        return this.AuthService.login(user);
    }

    @MessagePattern('users.auth.verifytoken')
    verifyToken(@Payload() tokenObject){
        return this.AuthService.verify_token(tokenObject.token)
    }

}

@Controller('auth')
@UseInterceptors(ValidateToken) 
export class OtherAuthController {
constructor(private AuthService:AuthService){}
    
    @MessagePattern('users.auth.findAll')
    findAll(){
        return this.AuthService.findAll();
    }

}