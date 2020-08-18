const db = require("../database")
const Sequelize = require("sequelize")
const User = require("./User")
const Restaurant = require("./Restaurant")

let Order = db.define("orders", {
    item_ordered: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false
    },
    quantity_ordered: {
        type: Sequelize.ARRAY(Sequelize.INTEGER),
        allowNull: false
    },
    total_price: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    payment_mode: {
        type: Sequelize.STRING,
        values: ['cash', 'card'],
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    order_status: {
        type: Sequelize.STRING,
        defaultValue: "pending"
    }
}, {
    timestamps: false
})

User.hasMany(Order, { foreignKey: "user_id" })
Order.belongsTo(User, { foreignKey: "user_id" })

Restaurant.hasMany(Order, { foreignKey: "restaurant_id" })
Order.belongsTo(Restaurant, { foreignKey: "restaurant_id" })

db.sync().then(res => {
    console.log("Order table has been created!")
})

module.exports = Order