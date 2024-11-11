import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    UnauthorizedException,
    Inject,
} from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ValidateTokenGlobal implements NestInterceptor {
    constructor(@Inject('USERS_CLIENT') private UserClient: ClientProxy){}
    private Log = new Logger("Interceptor: "+ ValidateTokenGlobal.name) 
    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
        this.Log.log("start method intercept")
        //const request = context.switchToRpc().getContext();
        this.Log.log("extract token")
        const request = context.switchToRpc().getData();
        const token = request.sendToken; 
        //const autho = request.headers?.authorization;
        //const token = autho?.split(' ')[1];
        // console.log( request?.args)
        if(!token){
            this.Log.error("token missing")
            throw new UnauthorizedException('token missing');
        }

        //verify token
        try{
            const pay_load = this.UserClient.send('users.auth.verifytoken',token)
            
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