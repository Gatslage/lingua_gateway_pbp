import { Body, ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserAuth } from './entities/auth.entity';
import { UsersService } from '../users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { TokenUserDto } from './dto/token-auth.dto';
import { GeneralUserDto, OutGeneralUserDto } from '../general-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices/exceptions';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserAuth) private UserA : Repository<UserAuth>,
    private user_service:UsersService,
    private jwtservice:JwtService,
    private configService:ConfigService
){}
   private  Log = new Logger("Service: "+AuthService.name)

    async verify_token(token:string){
        const result = await this.jwtservice.verifyAsync(token)
        return {
            email:result.sub,
            username:result.username
            
        }

    }

    async validate(val:CreateAuthDto){
        this.Log.log("start method validate")
        const userData =await this.user_service.findByEmail(val.email);
        const userAuth =await this.UserA.findOne({where:{email:val.email}})
        if (!userData || !userAuth) {
            this.Log.error("User email not found")
            throw new RpcException('User email not found');//NotFoundException
        }
        const pass = await this.comparepassword(val.password.trim(),userAuth.password.trim())
        if(!pass){
            this.Log.error("incorrect password")
            throw new RpcException("incorrect password");//UnauthorizedException
        }
        this.Log.log("end method validate")
        return userData;
    }

    async login(val:CreateAuthDto):Promise<TokenUserDto>{
        this.Log.log("start method login")
        const userFull = await this.validate(val);
        
        const token = await this.generate_token(userFull.email,userFull.username);
        this.Log.log("end method validate")
        if(userFull && token){return {...userFull,token}}
    }

    generate_token(email:string,username:string){
        this.Log.log("start method generate_token")

        const pay_load = {
            sub:email,
            username:username
        }
        this.Log.log("end method generate_token")

        return this.jwtservice.signAsync(pay_load)
    }
    async hashpassword(password:string){
        this.Log.log('run method hashpassword')
        return await bcrypt.hash(password,14)
    }
    async comparepassword(password:string,hash:string){
        return await bcrypt.compare(password, hash);
    }

    async register(newUser:GeneralUserDto):Promise<OutGeneralUserDto>{
        //check if exist
        this.Log.log("start method register")
        const userT =await this.UserA.findOne({where:{email:newUser.email}})
        console.log(userT)
        if(userT){this.Log.error("account with this email always exist");throw new RpcException('account with this email always exist')}//ConflictException
        //continue normal process
        const hashpassword = await this.hashpassword(newUser.password);
        const userAuth = await this.UserA.create({email:newUser.email,password:hashpassword});
        const {password,...data} = newUser;
        const userData = this.user_service.preCreate(data);
        if(!userAuth || !userData){
            this.Log.error("problem retry")
            throw new RpcException('problem retry');//InternalServerErrorException
        }

        try{
            //si les deux objets se sont créés alors on passe à l'enregistrement
            await this.UserA.save(userAuth);
            const outUser = await this.user_service.doneCreate(userData);

            const token = await this.generate_token(outUser.email,outUser.username);
            return {...outUser,token}

        }catch(err){
            this.Log.error("Internal error, one of twos database don't succesful objet creation")
            throw new RpcException(err)//InternalServerErrorException
        }

    }

    findAll(){
        this.Log.log("start method findAll auths")        
        return this.UserA.find();
    }
}
