import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { OrderStatus } from '../enums/Orderstatus';


export interface OrderAttributes {
  id: number;
  userId: string;
  itemIds: string[]; // We'll store as JSON
  totalAmount: number;
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  processingStartTime?: Date | null;
  processingEndTime?: Date | null;
}

// Some fields are optional when creating a new Order
export type OrderCreationAttributes = Optional<
  OrderAttributes,
  'id' | 'createdAt' | 'updatedAt' | 'status'
>;

export class Order extends Model<OrderAttributes, OrderCreationAttributes> 
  implements OrderAttributes {
  public id!: number;
  public userId!: string;
  public itemIds!: string[];
  public totalAmount!: number;
  public status!: OrderStatus;
  public createdAt!: Date;
  public updatedAt!: Date;
  public processingStartTime?: Date | null;
  public processingEndTime?: Date | null;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    itemIds: {
      type: DataTypes.JSONB, 
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'PROCESSING', 'COMPLETED'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    processingStartTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    processingEndTime: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: 'orders',
    sequelize,
    timestamps: false, 
  }
);