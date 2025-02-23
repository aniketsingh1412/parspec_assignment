"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Order extends sequelize_1.Model {
}
exports.Order = Order;
Order.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    itemIds: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: false,
    },
    totalAmount: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('PENDING', 'PROCESSING', 'COMPLETED'),
        allowNull: false,
        defaultValue: 'PENDING',
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    processingStartTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    processingEndTime: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'orders',
    sequelize: db_1.sequelize,
    timestamps: false,
});
//# sourceMappingURL=Order.js.map