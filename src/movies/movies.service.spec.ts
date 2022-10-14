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
    service.create({
      title: 'Test Movie',
      genres: ['test'],
      year: 2000,
    });
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

  describe('deletOne', () => {
    it('delets a movie', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const beforeDelete = service.getAll().length;
      service.deleteOnd(1);
      const afterDelete = service.getAll().length;

      expect(afterDelete).toBeLessThan(beforeDelete);
      // expect(afterDelete).toEqual(allMovies - 1); 위 코드와 같은 의미를 가진다.
      // aftertDelte.length가 allMovies.length - 1 와 같아야 된다는 것(한 개가 삭제됐으므로 movies배열의 길이가 -1이 되어야한다는 뜻
    });
    it('should retun a 404', () => {
      try {
        service.deleteOnd(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should  create a movice', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      const afterCreate = service.getAll().length;
      console.log(beforeCreate, afterCreate);
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movice', () => {
      service.create({
        title: 'Test Movie',
        genres: ['test'],
        year: 2000,
      });
      service.update(1, { title: 'Updated Test' });
      const movice = service.getOne(1);
      expect(movice.title).toEqual('Updated Test');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
