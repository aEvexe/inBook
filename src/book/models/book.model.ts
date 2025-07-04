import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { Author } from "../../authors/models/author.model";
import { BookVersion } from "../../book-version/models/book-version.model";
import { Collection } from "../../collections/models/collection.model";
import { BookCollection } from "../../book-collection/models/book-collection.model";
import { Bookmark } from "../../book-marks/models/book-mark.model";

interface IBooksCreationAtt{
    published_year: Date;
    authorId: number
}


@Table({tableName: "books"})
export class Book extends Model<Book, IBooksCreationAtt>{
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

    @BelongsToMany(()=>Collection, ()=>BookCollection)
    collection: Collection[]

    @HasMany(() => Bookmark)
    bookmarks: Bookmark[];
}



