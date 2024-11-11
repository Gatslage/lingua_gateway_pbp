import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable()
export class ValidateToken implements NestInterceptor {
    constructor(private jwtservice:JwtService){}
    private Log = new Logger("Interceptor: "+ ValidateToken.name) 
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        this.Log.log("start method intercept")
        //const request = context.switchToRpc().getContext();
        this.Log.log("extract token")
        const request = context.switchToRpc().getData();
        const token = request.sendToken;
        console.log("preee "+ request.sendToken) 
        //const autho = request.headers?.authorization;
        //const token = autho?.split(' ')[1];
        // console.log( request?.args)
        if(!token){
            this.Log.error("token missing")
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
            this.Log.log("wrong token")
            throw new UnauthorizedException('wrong token');
        } 

    }
}