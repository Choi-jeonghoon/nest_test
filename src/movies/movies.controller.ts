import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateMoviceDto } from './dto/create-movice.dto';
import { Movie } from './entities/Movie.entity';
import { MoviesService } from './movies.service';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAll(): Movie[] {
    return this.moviesService.getAll();
  }

  @Get('search')
  search(@Query('year') searchYear: string) {
    return `We are search for a movie made after:${searchYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') moviesId: number): Movie {
    console.log(typeof moviesId);
    return this.moviesService.getOne(moviesId);
  }

  @Post()
  create(@Body() movieData: CreateMoviceDto) {
    return this.moviesService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') moviesId: number) {
    return this.moviesService.deleteOnd(moviesId);
  }

  @Patch('/:id') // put 은 전체 업데이트를 할때 사용하고 patch는 일부분만 수정할때 사용한다.
  patch(@Param('id') moviesId: number, @Body() updataData) {
    return this.moviesService.updata(moviesId, updataData);
  }
}
