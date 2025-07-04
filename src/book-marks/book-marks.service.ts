import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Bookmark } from './models/book-mark.model';
import { CreateBookmarkDto } from './dto/create-book-mark.dto';
import { UpdateBookMarkDto } from './dto/update-book-mark.dto';


@Injectable()
export class BookmarkService {
  constructor(@InjectModel(Bookmark) private repo: typeof Bookmark) {}

  create(dto: CreateBookmarkDto) {
    return this.repo.create(dto);
  }

  findAll() {
    return this.repo.findAll({ include: { all: true } });
  }

  async findOne(userId: number, bookId: number) {
    const bookmark = await this.repo.findOne({ where: { userId, bookId }, include: { all: true } });
    if (!bookmark) throw new NotFoundException('Bookmark not found');
    return bookmark;
  }

  async update(userId: number, bookId: number, dto: UpdateBookMarkDto) {
    const bookmark = await this.findOne(userId, bookId);
    return bookmark.update(dto);
  }

  async remove(userId: number, bookId: number) {
    const bookmark = await this.findOne(userId, bookId);
    await bookmark.destroy();
    return { message: 'Bookmark removed' };
  }
}
