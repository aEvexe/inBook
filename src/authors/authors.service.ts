import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Author } from './models/author.model';

@Injectable()
export class AuthorsService {
  constructor(@InjectModel(Author) private authorModel: typeof Author){}
  create(createAuthorDto: CreateAuthorDto) {
    return this.authorModel.create(createAuthorDto);
  }

  findAll() {
    return this.authorModel.findAll({include: {all: true}});
  }

  findOne(id: number) {
    return this.authorModel.findByPk(id);
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return this.authorModel.update(updateAuthorDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.authorModel.destroy({where:{id}});
  }
}
