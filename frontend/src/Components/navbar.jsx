import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SignUp from "./Sign-up";
import Login from "./Log-in";
import axios from 'axios';
import { connect } from 'react-redux'
import Home from "./home";
import Menu from "./menu";
import Cart from "./cart";
import Restaurant from "./restaurant"
import SignUpRestaurant from "./Sign-up-restaurant";
import MenuRestaurant from "./menu-restaurant";
import AddItemToMenu from "./add-item-to-menu";
import HomeRestaurant from "./home-restaurant";
import About from "./about-us";

class Navbar extends Component {

    componentDidMount() {
        axios.get(`http://localhost:3020/user`)
            .then(res => {
                const users = res.data;
                let action = {
                    type: "all_current_users",
                    payload: users
                }
                this.props.sendUsers(action)
            })

        axios.get(`http://localhost:3020/restaurant`)
            .then(res => {
                const restaurants = res.data;
                let action = {
                    type: "all_restaurants",
                    payload: restaurants
                }
                this.props.sendRestaurants(action)
            })
    }

    render() {
        console.log("Navbar Props ===> ", this.props.userList)
        let menuRender
        let cartRender
        if (this.props.loggedInUser === true) {
            menuRender = (
                <Menu />
            )
        } else {
            menuRender = (
                <MenuRestaurant />
            )
        }
        if (this.props.loggedInUser === true) {
            cartRender = (
                <Cart />
            )
        } else {
            cartRender = (
                <AddItemToMenu />
            )
        }
        return (
            <div>

                <div className="App-header">
                    <Link to="/home">{/* Restaurant */}Home</Link>
                    <Link to="/about">About</Link>

                    {(() => {
                        if (this.props.loggedInUser === true) {
                            return (
                                <Link to="/user-dashboard">Dashboard</Link>
                            )
                        } else if (this.props.loggedInRestaurant === true) {
                            return (
                                <Link to="/restaurant-dashboard">Dashboard</Link>
                            )
                        }
                    })()}


                    {(() => {
                        if (this.props.loggedInUser === true) {
                            return (
                                <Link to="/items-available-for-user">Menu</Link>
                            )
                        } else if (this.props.loggedInRestaurant === true) {
                            return (
                                <Link to="/items-offered-by-restaurant">Menu</Link>
                            )
                        }
                    })()}
                    {(() => {
                        if (this.props.loggedInUser === true) {
                            return (
                                <Link to="/cart">Cart</Link>
                            )
                        } else if (this.props.loggedInRestaurant === true) {
                            return (
                                <Link to="/add-item-to-menu">Add-Item</Link>
                            )
                        }
                    })()}
                    <Link to="/signup">Sign-Up</Link>
                    {/* <Link to="/signup-restaurant">Sign-Up-restaurant</Link> */}
                    <Link to="/login">Log-In</Link>
                </div>
                <div>
                    <Route path="/home">
                        <div>
                            <Restaurant />
                        </div>
                    </Route>
                    <Route path="/about">
                        <div>
                            <About />
                        </div>
                    </Route>
                    <Route path="/user-dashboard">
                        <div>
                            <Home />
                        </div>
                    </Route>
                    <Route path="/restaurant-dashboard">
                        <div>
                            <HomeRestaurant />
                        </div>
                    </Route>
                    <Route path="/signup">
                        <div>
                            <SignUp />
                        </div>
                    </Route>
                    <Route path="/signup-restaurant">
                        <div>
                            <SignUpRestaurant />
                        </div>
                    </Route>
                    <Route path="/items-available-for-user">
                        <div>
                            <Menu />
                        </div>
                    </Route>
                    <Route path="/items-offered-by-restaurant">
                        <div>
                            <MenuRestaurant />
                        </div>
                    </Route>
                    <Route path="/cart">
                        <div>
                            <Cart />
                        </div>
                    </Route>
                    <Route path="/add-item-to-menu">
                        <div>
                            <AddItemToMenu />
                        </div>
                    </Route>
                    <Route path="/login">
                        <div>
                            <Login />
                        </div>
                    </Route>
                </div>
            </div>
        )
    }
}

// export default Navbar;

const mapStateToProps = (state) => {
    return {
        userList: state.users,
        loggedInUser: state.loggedIn,
        loggedInRestaurant: state.loggedInRestaurant
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendUsers: dispatch,
        sendRestaurants: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)