
import { ApiProperty } from '@nestjs/swagger';
import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from 'sequelize-typescript';
import { BookVersion } from '../../book-version/models/book-version.model';
import { AudioBooks } from '../../audio-book/models/audio-book.model';

interface IAudioPartsCreationAttr {
  audiobookId: number;
  title: string;
  file_url: string;
  duration: number;
  size_mb: number
  order_index: number
}

@Table({ tableName: 'audioParts', timestamps: true })
export class AudioParts extends Model<AudioParts, IAudioPartsCreationAttr> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ForeignKey(()=>AudioBooks)
    @Column({type: DataType.INTEGER, onDelete: "CASCADE" })
    declare audiobookId: number;

    @BelongsTo(()=>AudioBooks)
    Audio_books: AudioBooks

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare title: string;

  @ApiProperty()
  @Column({ type: DataType.STRING})
  declare file_url: string;

  @ApiProperty()
  @Column({ type: DataType.INTEGER })
  declare duration: number;

  @ApiProperty()
  @Column({ type: DataType.INTEGER })
  declare size_mb: number;

  @ApiProperty()
  @Column({ type: DataType.INTEGER })
  declare order_index: number;
}
