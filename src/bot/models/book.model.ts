import { Table, Model, Column, DataType, PrimaryKey } from "sequelize-typescript"

interface IBookCreationAtt{
    last_state: string
    user_id: number
}

@Table({tableName: "book"})
export class Book extends Model<Book, IBookCreationAtt>{
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
    declare author: string

    @Column({
        type: DataType.STRING,
    })
    declare published_year: string

    @Column({
        type: DataType.STRING,
    })
    declare last_state: string
}