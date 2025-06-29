import { Column, DataType, Table, Model } from "sequelize-typescript";

interface IAdminCreationAttr{
    full_name: string;
    email: string;
    password: string;
    is_creator: boolean
    is_active: boolean;
}

@Table({ tableName: "admin", timestamps: true})
export class Admin extends Model<Admin, IAdminCreationAttr>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true
    })
    declare full_name: string;

    @Column({
        type: DataType.STRING,

    })
    declare email: string;

    @Column({
        type: DataType.STRING,

    })
    declare password: string;


    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare is_active: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    declare is_creator: boolean;

    @Column({
        type: DataType.STRING(2000),
    })
    declare refresh_token: string;
}
