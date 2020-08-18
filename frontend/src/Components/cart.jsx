import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
//import { Link } from 'react-router-dom'

class Cart extends Component {

    generateBill = () => {
        let itemName = []
        let itemQuantity = []

        for (var i = 0; i < this.props.items.length; i++) {
            itemName.push(this.props.items[i].item_name)
        }

        for (var i = 0; i < this.props.items.length; i++) {
            itemQuantity.push(this.props.items[i].quantity)
        }

        let bill = {
            user_id: this.props.id,
            item_ordered: itemName,
            quantity_ordered: itemQuantity,
            total_price: this.props.total,
            payment_mode: this.props.payment,
            restaurant_id: this.props.restaurant_id
        }

        axios.post(`http://localhost:3020/order`, bill)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })

        let action = {
            type: "clear_cart"
        }
        this.props.clearCart(action)
    }

    handleAddQuantity = (id) => {
        let action = {
            type: "increment",
            payload: id
        }
        this.props.addQuantity(action)
    }

    handleSubtractQuantity = (id) => {
        let action = {
            type: "decrement",
            payload: id
        }
        this.props.subtractQuantity(action)
    }

    handleRemove = (id) => {
        let action = {
            type: "remove_from_cart",
            payload: id
        }
        this.props.subtractQuantity(action)
    }

    handleChecked = (e) => {
        if (e.target.checked) {
            this.props.addShipping({ type: "add_shipping" });
        }
        else {
            this.props.subtractShipping({ type: "subtract_shipping" });
        }
    }

    cash = () => {
        this.props.cash({ type: "cash" })
    }
    card = () => {
        this.props.card({ type: "card" })
    }

    render() {
        let addedItems
        let renderCart
        let generateButton
        if (this.props.items.length === 0) {
            generateButton = (
                <div>
                    Go to Menu to add items
                </div>
            )
        } else {
            generateButton = (
                <div>
                    <button onClick={() => { this.generateBill() }}>
                        Generate Bill
                    </button>
                </div>
            )
        }
        if (this.props.loggedInStatus === true) {
            addedItems = this.props.items.length ?
                (
                    this.props.items.map((item, index) => {
                        return (
                            <div className="collection-item avatar" key={item.id}>

                                <div className="table">
                                    <span className="title">Item Name: {item.item_name}</span>
                                    <span className="title">Cuisine Name: {item.cuisine_name}</span>
                                    <span> Price: INR {item.item_price} </span>
                                    <span>Quantity: {item.quantity}</span> <br />
                        <span>Restaurant ID: {item.restaurant_id}</span>
                                    <div className="add-remove">
                                        <button onClick={() => { this.handleAddQuantity(item.id) }}>+</button>
                                        <button onClick={() => { this.handleSubtractQuantity(item.id) }}>-</button>
                                    </div> <br />
                                    <button onClick={() => { this.handleRemove(item.id) }}>Remove</button>
                                </div>
                                <br />
                            </div>
                        )
                    })
                ) :

                (
                    <b>Your cart is Empty!</b>
                )

            renderCart = (
                <div>
                    <div className="tablePage">
                        {addedItems}
                    </div>
                    <div className="cartPage">
                        <div className="table">
                            <label>
                                <span>Tip (INR 50/-)</span>
                                <input type="checkbox" ref="shipping" onChange={this.handleChecked} />
                            </label>
                            <div>
                                Mode of payment :- {this.props.payment}
                                <br />
                                <button onClick={() => { this.cash() }}>CASH</button>
                                <button onClick={() => { this.card() }}>CARD</button>
                            </div>
                            <div>
                                Total Amount : {this.props.total}
                            </div>
                        </div>
                    </div>
                    {generateButton}
                </div>
            )
        } else {
            renderCart = (
                <b>Please login to continue</b>
            )
        }
        return (
            <div>
                {renderCart}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        items: state.addedItems,
        total: state.total,
        payment: state.paymentMode,
        id: state.currentID,
        loggedInStatus: state.loggedIn,
        currentUser: state.currentUser,
        restaurant_id: state.restaurantID
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem: dispatch,
        addQuantity: dispatch,
        subtractQuantity: dispatch,
        addShipping: dispatch,
        subtractShipping: dispatch,
        cash: dispatch,
        card: dispatch,
        clearCart: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)