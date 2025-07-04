import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collection } from './models/collection.model';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Injectable()
export class CollectionService {
  constructor(@InjectModel(Collection) private collectionRepo: typeof Collection) {}

  async create(dto: CreateCollectionDto) {
    return this.collectionRepo.create(dto);
  }

  async findAll() {
    return this.collectionRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const collection = await this.collectionRepo.findByPk(id, { include: { all: true } });
    if (!collection) throw new NotFoundException('Collection not found');
    return collection;
  }

  async update(id: number, dto: UpdateCollectionDto) {
    const collection = await this.findOne(id);
    return collection.update(dto);
  }

  async remove(id: number) {
    const collection = await this.findOne(id);
    await collection.destroy();
    return { message: 'Deleted successfully' };
  }
}
