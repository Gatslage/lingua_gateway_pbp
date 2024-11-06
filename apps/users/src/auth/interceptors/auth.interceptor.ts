import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ValidateToken implements NestInterceptor {
    constructor(private jwtservice:JwtService){}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        //const request = context.switchToRpc().getContext();
        const request = context.switchToRpc().getData();
        const token = request.sendToken; 
        //const autho = request.headers?.authorization;
        //const token = autho?.split(' ')[1];
        // console.log( request?.args)
        if(!token){
            throw new UnauthorizedException('token missing');
        }

        //verify token
        try{
            const result = await this.jwtservice.verifyAsync(token)
            const pay_load = {
                email:result.sub,
                username:result.username
                
            }
            request.user = pay_load;
            console.log(request)           
        return next.handle().pipe(
            map(data => data) 
        );
        }catch(err){
            throw new UnauthorizedException('wrong token');
        } 

    }
}