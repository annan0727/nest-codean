import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const generateSwagger = (app) => {
    // 生成swagger文档
    const options = new DocumentBuilder()
        .setTitle('接口文档') // 标题
        .setDescription('nest服务端接口') // 描述
        .setVersion('1.0') // 版本
        .addBearerAuth() // 添加权限验证
        .build()

    // 创建文档
    const document = SwaggerModule.createDocument(app, options);

    //安装swagger

    SwaggerModule.setup('/api/swagger', app, document)
}