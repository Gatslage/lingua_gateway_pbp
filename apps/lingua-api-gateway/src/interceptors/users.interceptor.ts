import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AddToken implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization.split(' ')[1];
        request.body.sendToken = token;
/*        // Ajoutez ici la logique pour modifier le corps du message
        const originalSend = context.getArgByIndex(1).send;
         context.getArgByIndex(1).send = (...args) => {
            const message = args[1]; // Le corps du message

        console.log("deuxiemme "+message);
        
            // Modifiez le corps du message ici
            const modifiedMessage = {
                ...message,
                additionalValue: 'value', // Ajoutez votre valeur ici
                url: request.url, // Par exemple, ajoutez l'URL
            };

            return originalSend.apply(context.getArgByIndex(1), [args[0], modifiedMessage]);
        }; */

        return next.handle().pipe(
            map(data => data) 
        );
    }
}