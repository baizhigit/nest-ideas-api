import { IsString } from 'class-validator';

import { UserRO } from 'src/user/user.dto';

export class IdeaDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

// tslint:disable-next-line: max-classes-per-file
export class IdeaRO {
  id?: string;
  created: Date;
  updated: Date;
  idea: string;
  description: string;
  author: UserRO;
}
