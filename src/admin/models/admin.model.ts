import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface IAdminCreationAttr {
  full_name: string;
  email: string;
  password: string;
  is_creator: boolean;
  is_active: boolean;
}

@Table({ tableName: 'admin', timestamps: true })
export class Admin extends Model<Admin, IAdminCreationAttr> {
  @ApiProperty()
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @ApiProperty()
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare full_name: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare email: string;

  @ApiProperty()
  @Column({ type: DataType.STRING })
  declare password: string;

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty()
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_creator: boolean;

  @ApiProperty()
  @Column({ type: DataType.STRING(2000) })
  declare refresh_token: string;
}
