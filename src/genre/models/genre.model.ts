import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IGenreCreationAttr {
  name: string;
}

@Table({ tableName: 'genre', timestamps: true })
export class Genre extends Model<Genre, IGenreCreationAttr> {
  @ApiProperty({ example: 1, description: 'Genre ID' })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty({ example: 'Fantasy', description: 'Genre name' })
  @Column({ type: DataType.STRING })
  declare name: string;
}
