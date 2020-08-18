const express = require("express")
const app = express()
const User = require("./Models/User")
const Menu = require("./Models/Menu")
const Order = require("./Models/Order")
const Restaurant = require("./Models/Restaurant")
const cors = require('cors')

app.use(cors()) // Use this after the variable declaration
app.use(express.json())

// User CRUD

app.post("/user", async(req, res) => {
    try {
        const { body } = req
        let user = await User.create({ user_name: body.user_name, first_name: body.first_name, last_name: body.last_name, email: body.email, password: body.password, mobile: body.mobile, age: body.age, address: body.address })
        res.send(user)
    } catch (error) {
        console.log(error)
        res.send(error)
    }
})

app.get("/user", async(req, res) => {
    try {
        // select * from tableName
        let users = await User.findAll();
        // select columnName from tableName
        // let tables = await Table.findAll({ attributes: ["name"] })
        res.send(users)
    } catch (error) {
        console.log(error)
    }
})

app.put("/user/:id", async(req, res) => {
    try {
        const { body, params } = req
        let user = await User.update({ user_name: body.user_name, first_name: body.first_name, last_name: body.last_name, email: body.email, password: body.password, mobile: body.mobile, age: body.age, address: body.address }, { where: { id: params.id } })
        res.send(user)
    } catch (error) {
        console.log(error)
    }
})

/*
app.delete("/user/:id", async(req, res) => {
    try {
        const { params } = req
        await User.destroy({ where: { id: params.id } })
        res.send("Deleted successfully")
    } catch (error) {
        console.log(error)
    }
})
*/

app.delete("/user", async(req, res) => {
    try {
        const { params } = req
        await User.destroy({
            where: {},
            truncate: true
        })
        res.send("Deleted All successfully")
    } catch (error) {
        console.log(error)
    }
})

// Menu CRUD

app.post("/menu", async(req, res) => {
    try {
        const { body } = req
        let menu = await Menu.create({ item_name: body.item_name, cuisine_name: body.cuisine_name, type: body.type, item_price: body.item_price, restaurant_id: body.restaurant_id })
        res.send(menu)
    } catch (error) {
        console.log(error)
    }
})

app.get("/menu", async(req, res) => {
    try {
        let menu = await Menu.findAll();
        res.send(menu)
    } catch (error) {
        console.log(error)
    }
})

app.get("/menujoin", async(req, res) => {
    try {
        const { body, params } = req
        let menu = await Menu.findAll({ where: {}, include: [Restaurant] });
        res.send(menu)
    } catch (error) {
        console.log(error)
    }
})

app.get("/menu/:id", async(req, res) => {
    try {
        const { body, params } = req
        let menu = await Menu.findAll({ where: { restaurant_id: params.id }, include: [Restaurant] });
        res.send(menu)
    } catch (error) {
        console.log(error)
    }
})

app.put("/menu/:id", async(req, res) => {
    try {
        const { body, params } = req
        let menu = await Menu.update({ item_name: body.item_name, cuisine_name: body.cuisine_name, type: body.type, item_price: body.item_price, restaurant_id: body.restaurant_id }, { where: { id: params.id } })
        res.send(menu)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/menu/:id", async(req, res) => {
    try {
        const { params } = req
        await Menu.destroy({ where: { id: params.id } })
        res.send("Deleted successfully")
    } catch (error) {
        console.log(error)
    }
})

// Orders CRUD

app.post("/order", async(req, res) => {
    try {
        const { body } = req
        let order = await Order.create({ user_id: body.user_id, item_ordered: body.item_ordered, quantity_ordered: body.quantity_ordered, total_price: body.total_price, payment_mode: body.payment_mode, restaurant_id: body.restaurant_id, order_status: body.order_status })
        res.send(order)
    } catch (error) {
        console.log(error)
    }
})

app.get("/order", async(req, res) => {
    try {
        let order = await Order.findAll({ where: {}, include: [User, Restaurant] });
        res.send(order)
    } catch (error) {
        console.log(error)
    }
})

app.get("/order/:id", async(req, res) => {
    try {
        const { body, params } = req
        let order = await Order.findAll({ where: { user_id: params.id }, include: [Restaurant] });
        res.send(order)
    } catch (error) {
        console.log(error)
    }
})

app.get("/order/res/:id", async(req, res) => {
    try {
        const { body, params } = req
        let order = await Order.findAll({ where: { restaurant_id: params.id }, include: [User] });
        res.send(order)
    } catch (error) {
        console.log(error)
    }
})

/* app.get("/order/:id", async(req, res) => {
    try {
        const { body, params } = req
        let order = await Order.findAll({ where: { restaurant_id: params.id }, include: [Restaurant] });
        res.send(order)
    } catch (error) {
        console.log(error)
    }
}) */


/* app.get("/order/:id/:res_id", async(req, res) => {
    try {
        const { body, params } = req
        let order = await Order.findAll({ where: { user_id: params.id, restaura }, include: [User] });
        res.send(order)
    } catch (error) {
        console.log(error)
    }
}) */

app.put("/order/:id", async(req, res) => {
    try {
        const { body, params } = req
        let order = await Order.update({ user_id: body.user_id, item_ordered: body.item_ordered, quantity_ordered: body.quantity_ordered, total_price: body.total_price, payment_mode: body.payment_mode, restaurant_id: body.restaurant_id, order_status: body.order_status }, { where: { id: params.id } })
        res.send(order)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/order/:id", async(req, res) => {
    try {
        const { params } = req
        await Order.destroy({ where: { id: params.id } })
        res.send("Deleted successfully")
    } catch (error) {
        console.log(error)
    }
})


// Restaurant CRUD

app.post("/restaurant", async(req, res) => {
    try {
        const { body } = req
        let restaurant = await Restaurant.create({ name: body.name, type: body.type, address: body.address, contact_mobile: body.contact_mobile, contact_email: body.contact_email, password: body.password })
        res.send(restaurant)
    } catch (error) {
        console.log(error)
    }
})


/* 

*/

/* 
{
	"item_name":"Item-D",
	"cuisine_name":"Cuisine-D",
	"type":"Veg",
	"item_price":199,
	"restaurant_id":9
}
*/

app.get("/restaurant", async(req, res) => {
    try {
        let restaurant = await Restaurant.findAll();
        res.send(restaurant)
    } catch (error) {
        console.log(error)
    }
})

app.put("/restaurant/:id", async(req, res) => {
    try {
        const { body, params } = req
        let restaurant = await Restaurant.update({ name: body.name, type: body.type, address: body.address, contact_mobile: body.contact_mobile, contact_email: body.contact_email, password: body.password }, { where: { id: params.id } })
        res.send(restaurant)
    } catch (error) {
        console.log(error)
    }
})

app.delete("/restaurant/:id", async(req, res) => {
    try {
        const { params } = req
        await Restaurant.destroy({ where: { id: params.id } })
        res.send("Deleted successfully")
    } catch (error) {
        console.log(error)
    }
})


module.exports = app