import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMoviceDto } from './dto/create-movice.dto';
import { UpdateMoviceDto } from './dto/update-movie.dto';
import { Movie } from './entities/Movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === +id);
    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
    return movie;
  }

  deleteOnd(id: number) {
    this.getOne(id);
    this.movies = this.movies.filter((movie) => movie.id !== id); //+id 는 number를 string 으로 바꿔준다
    return true;
  }

  create(movieData: CreateMoviceDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updataData: UpdateMoviceDto) {
    const movie = this.getOne(id);
    this.deleteOnd(id);
    this.movies.push({ ...movie, ...updataData });
  }
}
