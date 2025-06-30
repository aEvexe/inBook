import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ICategoriesCreationAttr {
  name: string;
}

@Table({ tableName: 'categories', timestamps: true })
export class Categories extends Model<Categories, ICategoriesCreationAttr> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare name: string;
}
