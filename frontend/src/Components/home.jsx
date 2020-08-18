import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'

class Home extends React.Component {
    state = {
        order: []
    }

    componentDidMount() {
        let id = this.props.id
        axios.get(`http://localhost:3020/order/${id}`)
            .then(res => {
                const order = res.data;
                this.setState({ order });
            })
    }

    delivered = (id) => {
        console.log(id)
        axios.put(`http://localhost:3020/order/${id}`, {
            order_status: "Delivered"
        }).then(res => {
                axios.get(`http://localhost:3020/order/${this.props.id}`)
            .then(res => {
                const order = res.data;
                this.setState({ order });
            })

                console.log(res);
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            })
    }

    render() {
        console.log("Login Props ===> ", this.props)
        console.log("Login State ===> ", this.state)
        let renderHome
        let orderHistory
        if (this.state.order.length === 0) {
            orderHistory = (
                <div style={{height: '450px'}}>
                    <b>Place your first order!</b>
                </div>
            )
        } else {
            orderHistory = (
                <div className="tablePage">
                    {this.state.order.map((order, index) => {
                        return (
                            <div className="table" key={index}>
                                OrderID : {order.id}<br />
                                Res. Name :  {order.restaurant.name}<br />
                                Res. Add : {order.restaurant.address}<br />
                                Contact : {order.restaurant.contact_email}<br />{order.restaurant.contact_mobile}<br /> 
                                {/* Restaurant Name : {this.props.restaurants.map((restaurant,index)=>{
                                    if (restaurant.id === order.restaurant_id){
                                    return <div>{restaurant.name}</div>
                                    }
                                })} */}
                                    Items Ordered : {order.item_ordered.map((item, index) => {
                                return (
                                    <div>
                                        {index + 1}.) {item}
                                    </div>
                                )
                            })}
                                    Respective Quantity : {order.quantity_ordered.map((quantity, index) => {
                                return (
                                    <div>
                                        {index + 1}.) {quantity}
                                    </div>
                                )
                            })}
                                    Payment Mode : {order.payment_mode}<br />
                                    Total Price : INR {order.total_price}<br />
                                    Current Status : {order.order_status}<br />
                                    {(()=>{
                                        if (order.order_status == "pending") {
                                            return(
                                                <div>
                                                    Please wait
                                                </div>
                                            )
                                        }
                                        if (order.order_status == "Accepted") {
                                            return(
                                                <div>
                                                   <p>Yay! Restaurant Accepted</p>
                                                   <button onClick={()=>{this.delivered(order.id)}}>delivered</button>
                                                </div>
                                            )
                                        }
                                        if (order.order_status == "Rejected") {
                                            return(
                                                <div>
                                                    Sorry!Restaurant Rejected
                                                </div>
                                            )
                                        }
                                        if (order.order_status == "Delivered") {
                                            return(
                                                <div>
                                                    Order completed
                                                </div>
                                            )
                                        }
                                    })()} 
                            </div>
                        )
                    })}
                </div>
            )

        }
        let text 
        if (this.state.order.length !== 0) {
            text = (
                <h3>Past Order's :-</h3>
            )
        }
        if (this.props.loggedInStatus === true) {
            renderHome = (
                <div>
                    <b>
                        Hi, {this.props.currentUser}
                    </b> <br />
                    {text}
                    {orderHistory}
                </div>
            )
        } else {
            renderHome = (
                <div style={{height: '450px'}}>
                    <b>Please login to continue</b>
                </div>
            )
        }
        return (
            <div>
                {renderHome}
            </div>
        )
    }
}

// export default Login;

const mapStateToProps = (state) => {
    return {
        // userList: state.users,
        // usernames: state.usernames,
        // passwords: state.passwords,
        loggedInStatus: state.loggedIn,
        currentUser: state.currentUser,
        id: state.currentID,
        restaurants: state.all_restaurants
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setLogInStatus: dispatch,
        // setLogOutStatus: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
