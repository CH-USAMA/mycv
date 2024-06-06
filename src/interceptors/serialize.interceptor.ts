import{
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler    
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { UserDto } from 'src/users/dtos/user.dto';

interface ClassConstructor{
    new (...args: any[]): {};
}

export function serialize(dto :ClassConstructor)
{
    return UseInterceptors(new SerializeInterceptor(dto));
}
export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any){

    }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request
    // by the request handler
    
    console.log('Before Handler',context);

    return handler.handle().pipe(
        map((data : any) => {
            // run something before respose is sent
            console.log("i am running before response is sent put",data);
            return plainToInstance(this.dto,data,
                {excludeExtraneousValues : true});
        })
    )
    }

    
}