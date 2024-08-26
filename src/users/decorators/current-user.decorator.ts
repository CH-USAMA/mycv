import{
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

export const CurrentUser = createParamDecorator (
    // context: ExecutionContext => is same as reffered to incoming request
    (data: never, context: ExecutionContext) => {
        // return "Hi usama here";
        const request = context.switchToHttp().getRequest();
        return request.currentUser;
    }
);