import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ILanguagesCreationAttr {
  code: string;
  name: string;
  flag: string;
}

@Table({ tableName: 'languages', timestamps: true })
export class Languages extends Model<Languages, ILanguagesCreationAttr> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare code: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare name: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare flag: string;
}
