import {
  Resolver,
  Query,
  Args,
  ResolveProperty,
  Parent,
  Mutation,
  Context,
} from '@nestjs/graphql';

import { IdeaService } from './idea.service';
import { CommentService } from 'src/comment/comment.service';
import { IdeaDTO } from './idea.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/shared/auth.guard';

@Resolver('Idea')
export class IdeaResolver {
  constructor(
    private ideaService: IdeaService,
    private commentService: CommentService,
  ) {}

  @Query()
  async ideas(@Args('page') page: number, @Args('newest') newest: boolean) {
    return await this.ideaService.showAll(page, newest);
  }

  @Query()
  async idea(@Args('id') id: string) {
    return await this.ideaService.read(id);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async createIdea(
    @Args('idea') idea: string,
    @Args('description') description: string,
    @Context('user') user,
  ) {
    const data: IdeaDTO = { idea, description };
    const { id: userId } = user;
    return await this.ideaService.create(userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async updateIdea(
    @Args('id') id: string,
    @Args('idea') idea: string,
    @Args('description') description: string,
    @Context('user') user,
  ) {
    const data: IdeaDTO = { idea, description };
    const { id: userId } = user;
    return await this.ideaService.update(id, userId, data);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async deleteIdea(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideaService.destroy(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async upvote(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideaService.upvote(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async downvote(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideaService.downvote(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async bookmark(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideaService.bookmark(id, userId);
  }

  @Mutation()
  @UseGuards(new AuthGuard())
  async unbookmark(@Args('id') id: string, @Context('user') user) {
    const { id: userId } = user;
    return await this.ideaService.unbookmark(id, userId);
  }

  @ResolveProperty()
  comments(@Parent() idea) {
    const { id } = idea;
    this.commentService.showByIdea(id);
  }
}
