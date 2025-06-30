import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Table, Model } from "sequelize-typescript";

interface IUserCreationAttr {
  full_name: string;
  email: string;
  password: string;
  phone: string;
  gender: string;
  birth_year: number;
}

@Table({ tableName: "user", timestamps: true })
export class User extends Model<User, IUserCreationAttr> {
  @ApiProperty({ example: 1, description: "User ID" })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @ApiProperty({ example: "John Doe", description: "Full name of the user" })
  @Column({ type: DataType.STRING, allowNull: false })
  declare full_name: string;

  @ApiProperty({ example: "john@example.com", description: "Email address" })
  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @ApiProperty({ example: "StrongPass!123", description: "Password" })
  @Column({ type: DataType.STRING })
  declare password: string;

  @ApiProperty({ example: "+998901234567", description: "Phone number" })
  @Column({ type: DataType.STRING })
  declare phone: string;

  @ApiProperty({ example: "Male", description: "Gender" })
  @Column({ type: DataType.ENUM("Male", "Female") })
  declare gender: string;

  @ApiProperty({ example: 1995, description: "Birth year" })
  @Column({ type: DataType.INTEGER })
  declare birth_year: number;

  @ApiProperty({ example: true, description: "Is active user" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_active: boolean;

  @ApiProperty({ example: false, description: "Is premium user" })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is_premium: boolean;

  @ApiProperty({ example: "uuid-1234-5678", description: "Activation link" })
  @Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
  declare activation_link: string;

  @ApiProperty({ example: "token...", description: "Refresh token" })
  @Column({ type: DataType.STRING(2000) })
  declare refresh_token: string;
}