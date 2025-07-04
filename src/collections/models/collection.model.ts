import {
  Table, Column, Model, DataType, ForeignKey, BelongsTo, BelongsToMany,
} from 'sequelize-typescript';
import { User } from '../../users/models/user.model';
import { BookCollection } from '../../book-collection/models/book-collection.model';
import { Book } from '../../book/models/book.model';

interface CollectionCreationAttr {
  title: string;
  description: string;
  coverImageUrl: string;
  userId: number;
  isPublic: boolean;
  isPremium: boolean;
}

@Table({ tableName: 'collections' })
export class Collection extends Model<Collection, CollectionCreationAttr> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare title: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare coverImageUrl: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false, onDelete: 'CASCADE' })
  declare userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isPublic: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isPremium: boolean;

  @BelongsToMany(()=>Book, ()=>BookCollection)
    books: Book[]
}
