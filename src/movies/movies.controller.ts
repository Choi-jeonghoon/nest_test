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

@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  @Get('search')
  search(@Query('year') searchYear: string) {
    return `We are search for a movie made after:${searchYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') moviesId: string) {
    return `This will return on movies with the id: ${moviesId}`;
  }
  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  @Delete('/:id')
  remove(@Param('id') moviesId: string) {
    return `This wil delete a movies with the id:${moviesId}`;
  }
  @Patch('/:id') // put 은 전체 업데이트를 할때 사용하고 patch는 일부분만 수정할때 사용한다.
  patch(@Param('id') moviesId: string, @Body() updataData) {
    return {
      updatedMovie: moviesId,
      updataData,
    };
  }
}
