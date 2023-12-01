import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Injectable } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
@Injectable()

export class HttpFilter implements ExceptionFilter {

    // exception 请求异常对象；host 提供上下文信息，包括请求和响应对象
    async catch(exception: HttpException, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp(); // 获取请求上下文
        const request = ctx.getRequest<Request>(); // 请求对象
        const response = ctx.getResponse<Response>(); // 响应对象
        const status = exception.getStatus(); //获取异常的http状态码
        const message: string | Object = exception.getResponse().valueOf(); //获取异常的响应内容，.valueOf 将响应内容转换为原始值（字符串或者对象）
        const path = request.url; // 请求路径

        console.log('拦截错误并返回');
        
        response.status(status).json({
            success: false,
            time: new Date(),
            data: message,
            message,
            status,
            path
        })
    }
}