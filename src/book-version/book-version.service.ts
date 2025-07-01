import { Injectable } from '@nestjs/common';
import { CreateBookVersionDto } from './dto/create-book-version.dto';
import { UpdateBookVersionDto } from './dto/update-book-version.dto';
import { InjectModel } from '@nestjs/sequelize';
import { BookVersion } from './models/book-version.model';

@Injectable()
export class BookVersionService {
  constructor(@InjectModel(BookVersion) private bookVersionModel: typeof BookVersion){}
  create(createBookVersionDto: CreateBookVersionDto) {
    return this.bookVersionModel.create(createBookVersionDto);
  }

  findAll() {
    return this.bookVersionModel.findAll({include:{all :true}});
  }

  findOne(id: number) {
    return this.bookVersionModel.findByPk(id);
  }

  update(id: number, updateBookVersionDto: UpdateBookVersionDto) {
    return this.bookVersionModel.update(updateBookVersionDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.bookVersionModel.destroy({where:{id}});
  }
}
