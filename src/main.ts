import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //유호성 검사 의 옵션!!
      whitelist: true, // decorator도 없는 어떠한 property의 object를 걸러준다.
      //한가지 더옵션을 추가하여 보안성 높이기
      forbidNonWhitelisted: true, //보안을 위해 이상한 것을 보내면 리퀘스트 자체를 막아준다.
      transform:true,//여기있는 유저들이 보낸 거를 우리가 원하는 실체 타입을 변환해준다.
    }),
  );
  await app.listen(3000);
  console.log(`http://localhost:3000`); //주소확인
}
bootstrap();
