import { createStore } from 'redux'
import axios from 'axios';


// Initial State


const initialState = {
    users: [],
    usernames: [],
    passwords: [],
    namesR: [],
    passwordsR: [],
    loggedIn: false,
    loggedInRestaurant: false,
    currentUser: "",
    currentRestaurant: "",
    currentRestaurantID: null,
    currentID: null,
    addedItems: [],
    total: 0,
    paymentMode: "CASH",
    restaurantID: null,
    all_restaurants: [],
    asUser: false,
    asRestaurant: false
}

// Dispatch Function

// Reducer Function

function appReducerFunction(state = initialState, action) {
    console.log("Redux State Here (state.js) =>> ", state, action)
    let stateCopy = JSON.parse(JSON.stringify(state))

    switch (action.type) {
        case "all_current_users":
            stateCopy.users = action.payload
            let usernames = []
            let passwords = []
            for (var i = 0; i < action.payload.length; i++) {
                usernames.push(action.payload[i].user_name)
                passwords.push(action.payload[i].password)
            }
            stateCopy.usernames = usernames
            stateCopy.passwords = passwords
            return stateCopy

        case "all_restaurants":
            stateCopy.all_restaurants = action.payload
            let namesR = []
            let passwordsR = []
            for (var i = 0; i < action.payload.length; i++) {
                namesR.push(action.payload[i].name)
                passwordsR.push(action.payload[i].password)
            }
            stateCopy.namesR = namesR
            stateCopy.passwordsR = passwordsR
            return stateCopy

        case "add_to_cart":
            let newItem = action.payload
            for (var i = 0; i < stateCopy.addedItems.length; i++) {
                if (stateCopy.addedItems[i].id === newItem.id) {
                    return stateCopy
                }
            }
            newItem.quantity = 1
            stateCopy.total += newItem.item_price
            stateCopy.addedItems.push(newItem)
            return stateCopy

        case "cash":
            stateCopy.paymentMode = "CASH"
            return stateCopy

        case "card":
            stateCopy.paymentMode = "CARD"
            return stateCopy

        case "increment":
            let addItem = stateCopy.addedItems.find(item => item.id === action.payload)
            addItem.quantity += 1
            stateCopy.total += addItem.item_price
            return stateCopy

        case "decrement":
            let subtractItem = stateCopy.addedItems.find(item => item.id === action.payload)
            if (subtractItem.quantity === 1) {
                let new_item = stateCopy.addedItems.filter(item => item.id !== action.payload)
                stateCopy.addedItems = new_item
                stateCopy.total -= subtractItem.item_price
            } else {
                subtractItem.quantity -= 1
                stateCopy.total -= subtractItem.item_price
            }
            return stateCopy

        case "remove_from_cart":
            let removeItem = stateCopy.addedItems.find(item => item.id === action.payload)
            let new_items = stateCopy.addedItems.filter(item => item.id !== action.payload)
            stateCopy.addedItems = new_items
            stateCopy.total -= (removeItem.item_price * removeItem.quantity)
            return stateCopy

        case "add_shipping":
            stateCopy.total += 50
            return stateCopy

        case "subtract_shipping":
            stateCopy.total -= 50
            return stateCopy

        case "clear_cart":
            stateCopy.total = 0
            stateCopy.addedItems = []
            stateCopy.paymentMode = "CASH"
            return stateCopy

        case "select_restaurant":
            stateCopy.restaurantID = action.payload.id
            stateCopy.addedItems = []
            return stateCopy

        case "login_status":
            stateCopy.loggedIn = true
            stateCopy.currentUser = action.payload.name
            stateCopy.currentID = action.payload.id
            return stateCopy

        case "login_status_restaurant":
            stateCopy.loggedInRestaurant = true
            stateCopy.currentRestaurant = action.payload.name
            stateCopy.currentRestaurantID = action.payload.id
            return stateCopy

        case "asUser":
            stateCopy.asUser = true
            stateCopy.asRestaurant = false
            return stateCopy

        case "asRestaurant":
            stateCopy.asUser = false
            stateCopy.asRestaurant = true
            return stateCopy

        case "logout_status":
            stateCopy.asUser = false
            stateCopy.asRestaurant = false
            stateCopy.loggedIn = false
            stateCopy.currentID = null
            stateCopy.currentUser = ""
            stateCopy.restaurantID = null
            stateCopy.addedItems = []
            stateCopy.total = 0
            stateCopy.paymentMode = "CASH"
            return stateCopy

        case "logout_status_restaurant":
            stateCopy.asUser = false
            stateCopy.asRestaurant = false
            stateCopy.loggedInRestaurant = false
            stateCopy.currentRestaurantID = null
            stateCopy.currentRestaurant = ""
            return stateCopy
    }
    return state
}

// Create Package
const store = createStore(appReducerFunction)
export default store