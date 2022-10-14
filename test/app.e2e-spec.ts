import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ValidationPipe } from '@nestjs/common';
import { title } from 'process';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        //유호성 검사 의 옵션!!
        whitelist: true, // decorator도 없는 어떠한 property의 object를 걸러준다.
        //한가지 더옵션을 추가하여 보안성 높이기
        forbidNonWhitelisted: true, //보안을 위해 이상한 것을 보내면 리퀘스트 자체를 막아준다.
        transform: true, //여기있는 유저들이 보낸 거를 우리가 원하는 실체 타입을 변환해준다.
      }),
    );
    //test 하는 곳에서도 실제 서버에서 적용한것처럼 위와 같은 코드추가로 변환을 해줘야한다.
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to my Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect('[]');
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'] })
        .expect(201);
    });

    //잘못된 데이터값을 테스트하기위해서 아래와 이 other값이라는 것을 추가하여 400 보내준다는 의미로 작성
    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'Test', year: 2000, genres: ['test'], other: 'thing' })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });

    it('GET 404', () => {
      return request(app.getHttpServer()).get('/movies/999').expect(404);
    });

    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'Updated Test' })
        .expect(200);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
  });
});
