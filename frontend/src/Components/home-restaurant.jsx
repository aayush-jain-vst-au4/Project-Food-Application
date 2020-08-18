import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'

class HomeRestaurant extends React.Component {
    state = {
        order: []
    }

    componentDidMount() {
        let id = this.props.id
        axios.get(`http://localhost:3020/order/res/${id}`)
            .then(res => {
                const order = res.data;
                this.setState({ order });
            })
    }

    acceptRequest = (id) => {
        console.log(id)
        axios.put(`http://localhost:3020/order/${id}`, {
            order_status: "Accepted"
        }).then(res => {
                axios.get(`http://localhost:3020/order/res/${this.props.id}`)
            .then(res => {
                const order = res.data;
                this.setState({ order });
            })

                console.log(res);
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            })
        // window.location.reload(false);
    }

    rejectRequest = (id) => {
        console.log(id)
        axios.put(`http://localhost:3020/order/${id}`, {
            order_status: "Rejected"
        })
            .then(res => {
                console.log(res);
                console.log(res.data);
            }).catch(error => {
                console.log(error)
            })

        axios.get(`http://localhost:3020/order/res/${this.props.id}`)
            .then(res => {
                const order = res.data;
                this.setState({ order });
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
                    <b>You haven't received any orders till now!</b>
                </div>
            )
        } else {
            orderHistory = (
                <div className="tablePage">
                    {this.state.order.map((order, index) => {
                        console.log(order)
                        return (
                            <div className="table" key={index}>
                                OrderID : {order.id}<br />
                                UserName : {order.user.user_name}<br />
                                FullName : {order.user.first_name + " " + order.user.last_name}<br />
                                Address : {order.user.address}<br />
                                Contact : {order.user.email}<br />{order.user.mobile}<br />
                                {/* User Name : {this.props.users.map((user,index)=>{
                                    if (user.id === order.user_id){
                                    return <div>{user.first_name+" "+user.last_name}</div>
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
                                   
                                {/* <button onClick={() => this.acceptRequest(order.id)}>Accept</button>
                                <button onClick={() => this.rejectRequest(order.id)}>Reject</button>
 */}
                                {(()=>{
                                        if (order.order_status == "pending") {
                                            return(
                                                <div>
                                                    <button onClick={() => this.acceptRequest(order.id)}>Accept</button>
                                                    <button onClick={() => this.rejectRequest(order.id)}>Reject</button>
                                                </div>
                                            )
                                        }
                                        if (order.order_status == "Accepted") {
                                            return(
                                                <div>
                                                   <p>Soon to be delivered</p>
                                                </div>
                                            )
                                        }
                                        if (order.order_status == "Rejected") {
                                            return(
                                                <div>
                                                    User will be informed that order is rejected
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
        loggedInStatus: state.loggedInRestaurant,
        currentUser: state.currentRestaurant,
        id: state.currentRestaurantID,
        restaurants: state.all_restaurants,
        users: state.users
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setLogInStatus: dispatch,
        // setLogOutStatus: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeRestaurant)
