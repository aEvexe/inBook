import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Author } from "../../authors/models/author.model";
import { Books } from "../../book/models/book.model";
import { Languages } from "../../languages/models/language.model";
import { AudioBooks } from "../../audio-book/models/audio-book.model";

interface IBookVersionCreationAtt{
    bookId: number
    languageId: number
    title: string
    description: string
    text_url: string
    cover_url: string
}


@Table({tableName: "book-version"})
export class BookVersion extends Model<BookVersion, IBookVersionCreationAtt>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number

    @ForeignKey(()=>Books)
    @Column({type: DataType.INTEGER, onDelete: "CASCADE" })
    declare bookId: number;

    @BelongsTo(()=>Books)
    book: Books

    @ForeignKey(()=>Languages)
    @Column({type: DataType.INTEGER, onDelete: "CASCADE" })
    declare languageId: number;

    @BelongsTo(()=>Languages)
    languages: Languages

    @Column({
        type: DataType.STRING,
    })
    declare title: string

    @Column({
        type: DataType.STRING,
    })
    declare description: string

    @Column({
        type: DataType.STRING,
    })
    declare text_url: string

    @Column({
        type: DataType.STRING,
    })
    declare cover_url: string

    @HasMany(()=> AudioBooks)
    audioBooks: AudioBooks[]
}



