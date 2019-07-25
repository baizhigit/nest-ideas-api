import {
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  Body,
  Delete,
} from '@nestjs/common';

import { CommentService } from './comment.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { User } from 'src/user/user.decorator';
import { CommentDTO } from './comment.dto';

@Controller('api/comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get('idea/:id')
  showCommentsByIdea(@Param('id') idea: string) {
    return this.commentService.showByIdea(idea);
  }

  @Get('user/:id')
  showCommentsByUser(@Param('id') user: string) {
    return this.commentService.showByUser(user);
  }

  @Post('idea/:id')
  @UseGuards(new AuthGuard())
  @UsePipes(new ValidationPipe())
  createComment(
    @Param('id') idea: string,
    @User('id') user: string,
    @Body() data: CommentDTO,
  ) {
    return this.commentService.create(idea, user, data);
  }

  @Get(':id')
  showComment(@Param('id') id: string) {
    return this.commentService.show(id);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyComment(@Param('id') id: string, @User('id') user: string) {
    return this.commentService.destroy(id, user);
  }
}
