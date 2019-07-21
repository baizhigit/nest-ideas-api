import { IsString } from 'class-validator';

export class IdeaDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;
}
