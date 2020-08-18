import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux'

class Login extends React.Component {

    state = {
        username: "",
        password: "",
        nameR: "",
        passwordR: "",
        /* asUser: false,
        asRestaurant: false, */
        message: "Click here to Login!"
    }

    handleUser = () => {
        this.setState({
            /* asUser:true,
            asRestaurant:false, */
            nameR: "",
            passwordR: ""
        })
        let action = {
            type: "asUser",
        }
        this.props.asUser(action)
    }

    handleRestaurant = () => {
        this.setState({
           /*  asUser:false,
            asRestaurant:true, */
            username: "",
            password:""
        })
        let action = {
            type: "asRestaurant",
        }
        this.props.asRestaurant(action)
        
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    // componentDidMount() {
    //     let usernames = []
    //     let passwords = []
    //     for (var i = 0; i < this.props.userList.length; i++) {
    //         usernames.push(this.props.userList[i].user_name)
    //         passwords.push(this.props.userList[i].password)
    //     }
    //     this.setState({
    //         usernames: usernames,
    //         passwords: passwords
    //     })
    // }

    submit = (e) => {
        e.preventDefault()
        for (let i = 0; i < this.props.usernames.length; i++) {
            if(this.props.usernames[i]===this.state.username){
                if (this.props.passwords[i] === this.state.password) {
                    console.log("logged in")
                    this.setState({
                        message: "You have successfully logged in!"
                    })
                    let action = {
                        type: "login_status",
                        payload:{
                            name:this.props.userList[i].first_name + " " +this.props.userList[i].last_name,
                            id: this.props.userList[i].id
                        }
                    }
                    this.props.setLogInStatus(action)
                    break
                } else {
                    console.log("Incorrent password")
                    this.setState({
                        message: "Incorrect password, please try again."
                    })
                    break
                }
            } else {
                console.log("username does not exist")
                this.setState({
                    message: "Sorry! This username does not exist"
                })
            }
        }
    }

    submitR = (e) => {
        e.preventDefault()
        for (let i = 0; i < this.props.namesR.length; i++) {
            if(this.props.namesR[i]===this.state.nameR){
                if (this.props.passwordsR[i] === this.state.passwordR) {
                    console.log("logged in")
                    this.setState({
                        message: "You have successfully logged in!"
                    })
                    let action = {
                        type: "login_status_restaurant",
                        payload:{
                            name:this.props.restaurantList[i].name,
                            id: this.props.restaurantList[i].id
                        }
                    }
                    this.props.setLogInStatusR(action)
                    break
                } else {
                    console.log("Incorrent password")
                    this.setState({
                        message: "Incorrect password, please try again."
                    })
                    break
                }
            } else {
                console.log("Restaurant with this name does not exist")
                this.setState({
                    message: "Sorry! Restaurant with this name does not exist"
                })
            }
        }
    }

    logout = () => {
        this.setState({
            username: "",
            password: "",
            nameR: "",
            passwordR: "",
            /* asUser: false,
            asRestaurant: false, */
            message: "Click here to Login!"
        })
        let action = {
            type: "logout_status"
        }
        this.props.setLogOutStatus(action)
    }

    logoutR = () => {
        this.setState({
            username: "",
            password: "",
            nameR: "",
            passwordR: "",
            /* asUser: false,
            asRestaurant: false, */
            message: "Click here to Login!"
        })
        let action = {
            type: "logout_status_restaurant"
        }
        this.props.setLogOutStatusR(action)
    }

    render() {
        console.log("Login Props ========> ", this.props)
        console.log("Login State ===> ", this.state)
        let renderLogIn
        let selectForLogIn = (
            <div>
                 <div class="form-check form-check-inline">
                    <input onClick={this.handleUser} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                    <label class="form-check-label" for="inlineRadio1">User</label>
                </div>
                <div class="form-check form-check-inline">
                    <input onClick={this.handleRestaurant} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    <label class="form-check-label" for="inlineRadio2">Restaurant</label>
                </div>
            </div>
        )

        if (this.props.User === false && this.props.Restaurant === false) {
            renderLogIn = (
                <p>
                    select how to login
                </p>
            )
        } else if (this.props.User === true) {
            if (this.props.loggedInStatus === true) {
                selectForLogIn = (
                    <div>
                        currently logged in as user
                    </div>
                )
                renderLogIn = (
                    <button onClick={()=>{this.logout()}} className="btn btn-primary">
                        Logout
                    </button>
                )
            } else {
                renderLogIn = (
                    <div>
                        <form>
                            <div className="form-group">
                                <label>Enter Username</label>
                                <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.username} name="username" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input type="password" onChange={(e) => { this.handleChange(e) }} value={this.state.password} name="password" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button onClick={(e) => { this.submit(e) }} type="submit" className="btn btn-primary">Login</button>
                        </form>
                        <p>
                            {this.state.message}
                        </p>
                    </div>
                )   
            }
        } else if(this.props.Restaurant === true) {
            if (this.props.loggedInRestaurantStatus === true) {
                selectForLogIn = (
                    <div>
                        currently logged in as restaurant
                    </div>
                )
                renderLogIn = (
                    <button onClick={()=>{this.logoutR()}} className="btn btn-primary">
                        Logout
                    </button>
                )
            } else {
                renderLogIn = (
                    <div>
                        <form>
                            <div className="form-group">
                                <label>Enter Name of Restaurant</label>
                                <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.nameR} name="nameR" aria-describedby="emailHelp" />
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                <input type="password" onChange={(e) => { this.handleChange(e) }} value={this.state.passwordR} name="passwordR" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <button onClick={(e) => { this.submitR(e) }} type="submit" className="btn btn-primary">Login</button>
                        </form>
                        <p>
                            {this.state.message}
                        </p>
                    </div>
                )  
            }
        }
        
        return (
            <div className="user-form"style={{height: '350px'}}>
                {selectForLogIn}
                {/* <div class="form-check form-check-inline">
                    <input onClick={this.handleUser} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                    <label class="form-check-label" for="inlineRadio1">User</label>
                </div>
                <div class="form-check form-check-inline">
                    <input onClick={this.handleRestaurant} class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                    <label class="form-check-label" for="inlineRadio2">Restaurant</label>
                </div> */}
                {renderLogIn}
            </div>
        )
    }
}

// export default Login;

const mapStateToProps = (state) => {
    return {
        userList: state.users,
        restaurantList: state.all_restaurants,
        usernames: state.usernames,
        passwords: state.passwords,
        namesR: state.namesR,
        passwordsR: state.passwordsR,
        loggedInStatus: state.loggedIn,
        loggedInRestaurantStatus: state.loggedInRestaurant,
        User: state.asUser,
        Restaurant: state.asRestaurant
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLogInStatus: dispatch,
        setLogInStatusR: dispatch,
        setLogOutStatus: dispatch,
        setLogOutStatusR: dispatch,
        asUser: dispatch,
        asRestaurant: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
