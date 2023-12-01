import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpFilter } from './common/filter';
import { Response } from './common/response';
import { generateSwagger } from './swagger';
async function bootstrap() {
  // 创建nest应用
  const app = await NestFactory.create(AppModule);

  // 全局过滤器拦截错误
  app.useGlobalFilters(new HttpFilter);

  // 全局响应拦截
  app.useGlobalInterceptors(new Response);

  // 全局应用管道，对传入的数据进行转换或者验证
  app.useGlobalPipes(new ValidationPipe());

  // 设置全局路由
  app.setGlobalPrefix('api');

  // 创建swagger接口文档
  generateSwagger(app);

  // 监听端口号
  await app.listen(+process.env.SERVICE_PORT);

}
bootstrap();
