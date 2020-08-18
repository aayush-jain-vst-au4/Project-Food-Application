import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'


class Menu extends React.Component {
    state = {
        menu: []
    }

    handleClick = (menu) => {
        let action = {
            type: "add_to_cart",
            payload: menu
        }
        this.props.addToCart(action)
    }

    componentDidMount() {
        axios.get(`http://localhost:3020/menu/${this.props.restaurantID}`)
            .then(res => {
                const menu = res.data;
                this.setState({ menu });
        })
    }


    render() {
        let message
        let renderMenu
        if (this.props.loggedInStatus === true) {
            if (this.props.restaurantID === null) {
                message = (
                    <b style={{height: '450px'}}>Dear {this.props.currentUser}, please select a restaurant</b>
                    )
                // renderMenu = (
                //     <div>
                //         <h4>Please select a restaurant</h4>
                //     </div>
                // )
            } else if(this.props.restaurantID !== null && this.state.menu.length === 0 ){
                message = (
                    <b style={{height: '450px'}}>Dear {this.props.currentUser}, this restaurant is not offering any items currently</b>
                    )
            } else {
                message = (
                    <b>Dear {this.props.currentUser}, please proceed to cart to place your order</b>
                    )
                renderMenu = (
                    <div className="tablePage">
                    {this.state.menu.map((menu, index) => {
                        return (
                            <div className="table" key={index}>
                                Sr. No. : {index+1}<br />
                                Name : {menu.item_name}<br />
                                Cuisine : {menu.cuisine_name}<br />
                                Type : {menu.type}<br />
                                Price : INR {menu.item_price}<br />
                                <button onClick={() => { this.handleClick(menu) }}>
                                    Add To Cart
                                </button>
                            </div>
                        )
                    })}
                    </div>
                )
            }
        } else {
            message = (
                <b style={{height: '450px'}}>Please login to add items to cart</b>
            )
        }
        
        return (
            <div style={{height: 'fit-content'}}>
                <b>Menu</b> <br/>
                {renderMenu}
                {message}
            </div>
        )
    }
}

const giveDataFromReduxToReactComponent = (state) => {
    //console.log("giveDataFromReduxToReactComponent ", state)
    return {
        loggedInStatus: state.loggedIn,
        currentUser: state.currentUser,
        restaurantID: state.restaurantID
    }
}

const giveReduxChangeRequestsFromReactComponent = (dispatch) => {
    //console.log("giveReduxChangeRequestsFromReactComponent ", dispatch)
    return {
        addToCart: dispatch
    }
}

export default connect(giveDataFromReduxToReactComponent, giveReduxChangeRequestsFromReactComponent)(Menu)

