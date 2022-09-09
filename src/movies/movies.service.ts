import { Injectable } from '@nestjs/common';
import { Movie } from './entities/Movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOnd(id: string): Movie {
    return this.movies.find((movie) => movie.id === +id);
  }

  deleteOnd(id: string): boolean {
    this.movies.find((movie) => movie.id === +id);
    return true;
  }

  create(movieData) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
