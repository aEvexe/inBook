import { BelongsTo, Column, DataType, ForeignKey, HasMany, HasOne, Model, Table } from "sequelize-typescript";
import { User } from "../../users/models/user.model";

interface ISubscriptionCreationAtt{
    userId: number
    startDate: Date
    endDate: Date
}


@Table({tableName: "subscription"})
export class Subscription extends Model<Subscription, ISubscriptionCreationAtt>{
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    declare id: number

    
    @ForeignKey(()=>User)
    @Column({type: DataType.INTEGER, onDelete: "CASCADE" })
    declare userId: number;
    
    @BelongsTo(()=>User)
    user: User

    @Column({
        type: DataType.DATEONLY,
    })
    declare startDate: Date
    
    @Column({
        type: DataType.DATEONLY,
    })
    declare endDate: Date

    // @HasOne(()=> Payments)
    // payments: Payments[]
}



