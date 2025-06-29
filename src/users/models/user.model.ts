import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"

interface IUserCreationAttr{
    full_name: string;
    email: string;
    password: string;
    phone: string,
    gender: string;
    birth_year: number;
}

@Table({tableName: "user", timestamps: true})
export class User extends Model<User, IUserCreationAttr>{
    // @ApiProperty({
    //     example: "user Id",
    //     description: "User's Id"
    // })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    // @ApiProperty({
    //     example: "user1",
    //     description: "User's name"
    // })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare full_name: string;

    // @ApiProperty({
    //     example: "user1@gmail.com",
    //     description: "User's email"
    // })
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true 
    })
    declare email: string;

    // @ApiProperty({
    //     example: "Uzbek!$t0n",
    //     description: "User's password"
    // })
    @Column({
        type: DataType.STRING,
    })
    declare password: string;

    @Column({
        type: DataType.STRING,
    })
    declare phone: string;

    // @ApiProperty({
    //     example: false,
    //     description: "Are user active or not"
    // })
    @Column({
        type: DataType.ENUM("Male", "Female"),
    })
    declare gender: string;

    @Column({
        type: DataType.INTEGER,
    })
    declare birth_year: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare is_active: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare is_premium: boolean;

    @Column({
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4
    })
    declare activation_link: string;

    @Column({
        type: DataType.STRING(2000),
    })
    declare refresh_token: string;
}
