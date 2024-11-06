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

@Injectable()
export class AuthService {
    constructor(@InjectRepository(UserAuth) private UserA : Repository<UserAuth>,
    private user_service:UsersService,
    private jwtservice:JwtService,
    private configService:ConfigService
){}

    async validate(val:CreateAuthDto){
        
        const userData =await this.user_service.findByEmail(val.email);
        const userAuth =await this.UserA.findOne({where:{email:val.email}})
        if (!userData || !userAuth) {
            throw new NotFoundException('User email not found');
        }
        if(val.password.trim() !== userAuth.password.trim()){
            throw new UnauthorizedException(  userAuth.password+val.password);
        }
        return userData;
    }

    async login(val:CreateAuthDto):Promise<TokenUserDto>{
        const userFull = await this.validate(val);
        
        const token = await this.generate_token(userFull.email,userFull.username);
        if(userFull && token){return {...userFull,token}}
    }

    generate_token(email:string,username:string){
        const pay_load = {
            sub:email,
            username:username
        }
        return this.jwtservice.signAsync(pay_load)
    }

    async register(newUser:GeneralUserDto):Promise<OutGeneralUserDto>{
        //check if exist
        const userT =await this.UserA.findOne({where:{email:newUser.email}})
        console.log(userT)
        if(userT){throw new ConflictException('account with this email always exist')}
        //continue normal process
        const userAuth = await this.UserA.create({email:newUser.email,password:newUser.password});
        const {password,...data} = newUser;
        const userData = this.user_service.preCreate(data);
        if(!userAuth || !userData){
            throw new InternalServerErrorException('problem retry');
        }

        try{
            //si les deux objets se sont créés alors on passe à l'enregistrement
            await this.UserA.save(userAuth);
            const outUser = await this.user_service.doneCreate(userData);

            const token = await this.generate_token(outUser.email,outUser.username);
            return {...outUser,token}

        }catch(err){
            throw new InternalServerErrorException(err)
        }

    }

    findAll(){
        
        return this.UserA.find();
    }
}
