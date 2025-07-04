import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Book } from '../../book/models/book.model';

interface IAuthorCreationAttr {
  full_name: string;
  bio: string;
  photo_url: string;
}

@Table({ tableName: 'author', timestamps: true })
export class Author extends Model<Author, IAuthorCreationAttr> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare full_name: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare bio: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare photo_url: string;

  @HasMany(()=> Book)
  books: Book[]
}
