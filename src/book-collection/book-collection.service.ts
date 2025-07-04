import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BookCollection } from './models/book-collection.model';
import { CreateBookCollectionDto } from './dto/create-book-collection.dto';

@Injectable()
export class BookCollectionService {
  constructor(@InjectModel(BookCollection) private repo: typeof BookCollection) {}

  create(dto: CreateBookCollectionDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll({ include: { all: true } });
  }

  async remove(bookId: number, collectionId: number) {
    const entry = await this.repo.findOne({ where: { bookId, collectionId } });
    if (entry) {
      await entry.destroy();
      return { message: 'Removed' };
    }
    return { message: 'Not found' };
  }
}
