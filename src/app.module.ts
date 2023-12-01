import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // 环境配置
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 设置全局环境
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}` // 环境文件
    }),
    // 数据库配置
    TypeOrmModule.forRootAsync({
      useFactory: () => (
        {
          type: 'mysql',
          host: process.env.DATABASE_HOST,
          port: +process.env.DATABASE_PORT,
          database: process.env.DATABASE_NAME,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV === 'development' ? true : false // 开启同步，生产禁止
        }
      )
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
