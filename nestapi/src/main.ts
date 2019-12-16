import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
//   const cros_options = {
//     "origin": "*",
//     "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//     "preflightContinue": false,
//     "credentials":true
// }
  const appOptions = {cors: true, };
  const app = await NestFactory.create(AppModule,appOptions);
  // app.enableCors(cros_options)
  app.setGlobalPrefix('api');

  const options = new DocumentBuilder()
    .setTitle('NAH API')
    .setDescription('nah api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  const port = process.env.port || 3000;
  await app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening at http://localhost:${port}/api`);
  });
}
bootstrap();
