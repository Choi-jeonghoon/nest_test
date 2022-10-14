import { IsString, IsNumber } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateMoviceDto } from './create-movice.dto';

// export class UpdateMoviceDto {
//   @IsString()
//   readonly title?: string;

//   @IsNumber()
//   readonly year?: number;

//   @IsString({ each: true })
//   readonly genres?: string[];
// }

//?무름표가 있는 이유는 업데이트를 할때 title, year, genres 중 한가지만 수정할수도 있고 전부할수도 있기때문에 ? 를 붙여준다. 즉 필수사항이 아닐때 표시한다.
// 아래는 부분 타입(partial types)
export class UpdateMoviceDto extends PartialType(CreateMoviceDto) {}
