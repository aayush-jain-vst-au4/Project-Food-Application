const db = require("../database")
const Sequelize = require("sequelize")

let Restaurant = db.define("restaurants", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        values: ['indian', 'italian', 'continental', 'chinese', 'mexican', 'thai'],
        allowNull: false,
        defaultValue: "Indian"
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "XYZ Road, XYZ Locality, XYZ Street"
    },
    contact_mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    contact_email: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'customercare@xyz.com'
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false
})

db.sync().then(res => {
    console.log("Restaurant table has been created!")
})

module.exports = Restaurant