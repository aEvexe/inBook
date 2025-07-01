import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Books } from './models/book.model';

@Injectable()
export class BookService {
  constructor(@InjectModel(Books) private booksService: typeof Books){}
  create(createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  findAll() {
    return this.booksService.findAll({include:{all: true}});
  }

  findOne(id: number) {
    return this.booksService.findByPk(id);
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.booksService.update(updateBookDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.booksService.destroy({where:{id}});
  }
}
