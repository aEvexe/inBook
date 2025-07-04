import {
  Table, Column, Model, ForeignKey, DataType, BelongsTo,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { Book } from '../../book/models/book.model';

interface BookmarkCreationAttr {
  userId: number;
  bookId: number;
  note: string;
  position: number;
}

@Table({ tableName: 'bookmarks' })
export class Bookmark extends Model<Bookmark, BookmarkCreationAttr> {
  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Book)
  @Column({ type: DataType.INTEGER, allowNull: false })
  declare bookId: number;
  
  @BelongsTo(() => Book)
  book: Book;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare note: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare position: number;
}
