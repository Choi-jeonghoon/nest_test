import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // getAll()이 배열을 리턴하는 안 하는지 test
  describe('getAll', () => {
    it('should return an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  // getOne의 임의 값을 만들어 test
  describe('getOne', () => {
    it('should return a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });

      const movice = service.getOne(1);
      expect(movice).toBeDefined(); //생성한 movie 리턴 확인
      expect(movice.id).toEqual(1); //생성한 movie의 데이터의 Id값은 1인지 비교
      expect(movice.title).toEqual('Test Movie'); //생성한 movie의 데이터의 title값을 비교 test
      expect(movice.year).toEqual(2000); //생성한 movie의 데이터의 year값을 비교 test
    });
    it('should throw 404 error', () => {
      try {
        service.getOne(99);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('Movie with ID 99 not found');
      }
    });
  });
});
