import { Table, Model, Column, DataType, PrimaryKey } from "sequelize-typescript"

interface ILibraryCreationAtt{
    last_state: string
    user_id: number
}

@Table({tableName: "library"})
export class Library extends Model<Library, ILibraryCreationAtt>{
    @Column({
        type: DataType.BIGINT,
        autoIncrement: true,
        primaryKey: true
    })
    declare id: number

    @Column({
        type: DataType.STRING,
    })
    declare name: string

    @Column({
        type: DataType.BIGINT,
    })
    declare user_id: number

    @Column({
        type: DataType.STRING,
    })
    declare address: string

    @Column({
        type: DataType.STRING,
    })
    declare location: string

    @Column({
        type: DataType.STRING,
    })
    declare phone_number: string

    @Column({
        type: DataType.STRING,
    })
    declare last_state: string
}