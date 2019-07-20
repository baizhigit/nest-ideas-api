import { Injectable } from '@nestjs/common';
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
    return await this.ideaRepositorty.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<IdeaDTO>): Promise<IdeaEntity> {
    await this.ideaRepositorty.update({ id }, data);
    return await this.ideaRepositorty.findOne({ id });
  }

  async destroy(id: string) {
    await this.ideaRepositorty.delete({ id });
    return { deleted: true };
  }
}
