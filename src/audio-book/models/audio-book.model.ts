import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { BookVersion } from '../../book-version/models/book-version.model';
import { AudioParts } from '../../audio-parts/models/audio-part.model';

interface IAudioBooksCreationAttr {
  bookversionId: number;
  narrator_name: string;
  total_duration: number;
  total_size_mb: number;
}

@Table({ tableName: 'audioBooks', timestamps: true })
export class AudioBooks extends Model<AudioBooks, IAudioBooksCreationAttr> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(()=>BookVersion)
    @Column({type: DataType.INTEGER, onDelete: "CASCADE" })
    declare bookversionId: number;

    @BelongsTo(()=>BookVersion)
    book_version: BookVersion

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare narrator_name: string;

  @ApiProperty()
  @Column({ type: DataType.INTEGER })
  declare total_duration: number;

  @ApiProperty()
  @Column({ type: DataType.INTEGER })
  declare total_size_mb: number;

  @HasMany(()=> AudioParts)
  audio_parts: AudioParts[]
}
