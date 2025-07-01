import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Author } from "../../authors/models/author.model";
import { BookVersion } from "../../book-version/models/book-version.model";

interface IBooksCreationAtt{
    published_year: Date;
    authorId: number
}


@Table({tableName: "books"})
export class Books extends Model<Books, IBooksCreationAtt>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number

    @Column({
        type: DataType.DATEONLY,
    })
    declare published_year: Date

    @ForeignKey(()=>Author)
    @Column({type: DataType.INTEGER, onDelete: "CASCADE" })
    declare authorId: number;

    @BelongsTo(()=>Author)
    author: Author

    @Column({
        type: DataType.STRING,
    })
    declare image: string

    @HasOne(()=> BookVersion)
    book_version: BookVersion[]
}



