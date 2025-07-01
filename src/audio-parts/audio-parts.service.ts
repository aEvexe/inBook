import { Injectable } from '@nestjs/common';
import { CreateAudioPartDto } from './dto/create-audio-part.dto';
import { UpdateAudioPartDto } from './dto/update-audio-part.dto';
import { InjectModel } from '@nestjs/sequelize';
import { AudioParts } from './models/audio-part.model';

@Injectable()
export class AudioPartsService {
  constructor(@InjectModel(AudioParts) private audioPartsModule: typeof AudioParts){}
  create(createAudioPartDto: CreateAudioPartDto) {
    return this.audioPartsModule.create(createAudioPartDto);
  }

  findAll() {
    return this.audioPartsModule.findAll({include:{all : true}});
  }

  findOne(id: number) {
    return this.audioPartsModule.findByPk(id);
  }

  update(id: number, updateAudioPartDto: UpdateAudioPartDto) {
    return this.audioPartsModule.update(updateAudioPartDto, {where: {id}, returning: true} );
  }

  remove(id: number) {
    return this.audioPartsModule.destroy({where:{id}});
  }
}
