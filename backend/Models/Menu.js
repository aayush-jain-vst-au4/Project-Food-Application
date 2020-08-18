const db = require("../database")
const Sequelize = require("sequelize")
const Restaurant = require("./Restaurant")

let Menu = db.define("menus", {
    item_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cuisine_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        values: ['veg', 'non-veg', 'egg'],
        allowNull: false
    },
    item_price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 199
    },
    restaurant_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false
})

Restaurant.hasMany(Menu, { foreignKey: "restaurant_id" })
Menu.belongsTo(Restaurant, { foreignKey: "restaurant_id" })


db.sync().then(res => {
    console.log("Menu table has been created!")
})

module.exports = Menu