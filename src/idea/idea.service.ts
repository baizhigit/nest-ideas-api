import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IdeaEntity } from './idea.entity';
import { IdeaDTO } from './idea.dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(IdeaEntity)
    private readonly ideaRepositorty: Repository<IdeaEntity>,
  ) {}

  async showAll(): Promise<IdeaEntity[]> {
    return await this.ideaRepositorty.find();
  }

  async create(data: IdeaDTO): Promise<IdeaEntity> {
    const idea = await this.ideaRepositorty.create(data);
    await this.ideaRepositorty.save(idea);
    return idea;
  }

  async read(id: string): Promise<IdeaEntity> {
    const idea = await this.ideaRepositorty.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return idea;
  }

  async update(id: string, data: Partial<IdeaDTO>): Promise<IdeaEntity> {
    let idea = await this.ideaRepositorty.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.ideaRepositorty.update({ id }, data);
    idea = await this.ideaRepositorty.findOne({ where: { id } });
    return idea;
  }

  async destroy(id: string): Promise<IdeaEntity> {
    const idea = await this.ideaRepositorty.findOne({ where: { id } });
    if (!idea) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.ideaRepositorty.delete({ id });
    return idea;
  }
}
