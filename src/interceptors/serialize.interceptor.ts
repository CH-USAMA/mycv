import{
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler    
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { UserDto } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request
    // by the request hadnler
    
    console.log('Before Handler',context);

    return handler.handle().pipe(
        map((data : any) => {
            // run something before respose is sent
            console.log("i am running before response is sent put",data);
            return plainToClass(UserDto,data,
                {excludeExtraneousValues : true});
        })
    )
    }

    
}