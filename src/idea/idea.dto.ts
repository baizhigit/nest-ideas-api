import { IsString } from 'class-validator';

import { UserRO } from '../user/user.dto';

export class IdeaDTO {
  @IsString()
  readonly idea: string;

  @IsString()
  readonly description: string;
}

// tslint:disable-next-line: max-classes-per-file
export class IdeaRO {
  id?: string;
  created: Date;
  updated: Date;
  idea: string;
  description: string;
  author: UserRO;
  upvotes?: number;
  downvotes?: number;
}
