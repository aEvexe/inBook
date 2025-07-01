import { Injectable } from '@nestjs/common';
import { CreateAudioBookDto } from './dto/create-audio-book.dto';
import { UpdateAudioBookDto } from './dto/update-audio-book.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AudioBooks } from './models/audio-book.model';

@Injectable()
export class AudioBookService {
  constructor(@InjectModel(AudioBooks) private audioBooksModel: typeof AudioBooks){}
  create(createAudioBookDto: CreateAudioBookDto) {
    return this.audioBooksModel.create(createAudioBookDto);
  }

  findAll() {
    return this.audioBooksModel.findAll({include:{all: true}});
  }

  findOne(id: number) {
    return this.audioBooksModel.findByPk(id);
  }

  update(id: number, updateAudioBookDto: UpdateAudioBookDto) {
    return this.audioBooksModel.update(updateAudioBookDto, {where: {id}, returning: true});
  }

  remove(id: number) {
    return this.audioBooksModel.destroy({where:{id}});
  }
}
