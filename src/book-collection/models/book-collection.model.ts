import {
  Table,
  Model,
  Column,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Book } from '../../book/models/book.model';
import { Collection } from '../../collections/models/collection.model';

interface BookCollectionCreationAttr {
  bookId: number;
  collectionId: number;
}

@Table({ tableName: 'book_collections', timestamps: false })
export class BookCollection extends Model<BookCollection, BookCollectionCreationAttr> {
  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER })
  declare bookId: number;

  @ForeignKey(() => Collection)
  @Column({ type: DataType.INTEGER })
  declare collectionId: number;
}
