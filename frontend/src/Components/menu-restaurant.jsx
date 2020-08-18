import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'

class MenuRestaurant extends React.Component {
    state = {
        menu: []
    }

    componentDidMount() {
        let id = this.props.id
        axios.get(`http://localhost:3020/menu/${id}`)
            .then(res => {
                const menu = res.data;
                this.setState({ menu });
            })
    }

    deleteCurrentItem = (id) => {
        axios.delete(`http://localhost:3020/menu/${id}`)
            .then(res => {
                const menu = res.data;
                console.log(menu)
                // this.setState({ menu });
                axios.get(`http://localhost:3020/menu/${this.props.id}`)
                    .then(res => {
                        const menu = res.data;
                        this.setState({ menu });
                    })
            })
    }

    render() {
        //console.log("Login Props ===> ", this.props)
        //console.log("Login State ===> ", this.state)
        let renderHome
        let orderHistory
        if (this.state.menu.length === 0) {
            orderHistory = (
                <div style={{height: '450px'}}>
                    <b>You have not added any items to your menu!</b>
                </div>
            )
        } else {
            orderHistory = (
                <div className="tablePage">
                    {this.state.menu.map((menu, index) => {
                        return (
                            <div className="table" key={index}>
                                Sr. No. : {index+1}<br />
                                Name : {menu.item_name}<br />
                                Cuisine : {menu.cuisine_name}<br />
                                Type : {menu.type}<br />
                                Price : INR {menu.item_price}<br />
                                <button onClick={()=>{this.deleteCurrentItem(menu.id)}}>Delete Item</button>
                            </div>
                        )
                    })}
                </div>
            )

        }
        let text 
        if (this.state.menu.length !== 0) {
            text = (
                <h3>Current Items in your menu :-</h3>
            )
        }
        if (this.props.loggedInStatus === true) {
            renderHome = (
                <div>
                    <b>
                        Hi, @{this.props.currentUser}
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
            <div style={{height: 'fit-content'}}>
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
        restaurants: state.all_restaurants
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // setLogInStatus: dispatch,
        // setLogOutStatus: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuRestaurant)
