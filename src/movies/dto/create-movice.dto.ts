import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateMoviceDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true })
  readonly genres: string[];
}
