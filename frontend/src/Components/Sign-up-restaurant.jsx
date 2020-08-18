import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

class SignUpRestaurant extends React.Component {
    state = {
        name: "",
        type: "",
        address: "",
        contact_email: "",
        contact_mobile: "",
        password: "",
        message: "Click here to sign up!"
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        console.log("submittttttttt")
        if (this.state.name == "" || this.state.type == "" || this.state.address == "" || this.state.contact_email == "" || this.state.contact_mobile == "" || this.state.password == "" ) {
            this.setState({
                message: "Please fill all the inputs"
            })
        } else{
            if (this.props.restaurantList.length === 0) {
                this.setState({
                    message: "Your profile has been successfully created!"
                })
                let newUser = {
                    name: this.state.name,
                    type: this.state.type,
                    address: this.state.address,
                    contact_email: this.state.contact_email,
                    contact_mobile: this.state.contact_mobile,
                    password: this.state.password
                }
    
                axios.post(`http://localhost:3020/restaurant`, newUser)
                    .then(res => {
                        console.log(res);
                        console.log(res.data);
                    }).catch(error => {
                        console.log(error)
                    })
            } else {
                for (var i = 0; i < this.props.restaurantList.length; i++) {
                    if (this.props.restaurantList[i].name === this.state.name) {
                        e.preventDefault()
                        console.log("Name not unique")
                        this.setState({
                            message: "Sorry! This Name already exists."
                        })
                        break
                    }
                    
                    if (this.props.restaurantList[i].contact_email === this.state.contact_email) {
                        e.preventDefault()
                        console.log("email not unique")
                        this.setState({
                            message: "Sorry! This email already exists."
                        })
                        break
                    }

                    if (this.props.restaurantList[i].contact_mobile === this.state.contact_mobile) {
                        e.preventDefault()
                        console.log("mobile not unique")
                        this.setState({
                            message: "Sorry! This contact number already exists."
                        })
                        break
                    }
    
                    console.log("creating new restaurant ...")
                    this.setState({
                        message: "New Restaurant has been successfully created!"
                    })
                    let newUser = {
                        name: this.state.name,
                        type: this.state.type,
                        address: this.state.address,
                        contact_email: this.state.contact_email,
                        contact_mobile: this.state.contact_mobile,
                        password: this.state.password
                    }
    
                    axios.post(`http://localhost:3020/restaurant`, newUser)
                        .then(res => {
                            console.log(res);
                            console.log(res.data);
                        }).catch(error => {
                            console.log(error)
                        })
    
                }                       
            }
        }
    }


    render() {
        let form = (
            <form className="user-form">
                <div className="form-group">
                    <label>Enter Name</label>
                    <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.name} name="name" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label>Enter Type</label>
                    <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.type} name="type" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label>Enter Address</label>
                    <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.address} name="address" aria-describedby="emailHelp" required />
                </div>
                <div className="form-group">
                    <label>Enter Email</label>
                    <input type="email" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.contact_email} name="contact_email" aria-describedby="emailHelp" required/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label>Email Contact No.</label>
                    <input type="integer" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.contact_mobile} name="contact_mobile" aria-describedby="emailHelp" required/>
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label >Password</label>
                    <input type="password" onChange={(e) => { this.handleChange(e) }} value={this.state.password} name="password" className="form-control" id="exampleInputPassword1" required />
                </div>
                <button onClick={(e) => { this.submit(e) }} type="submit" className="btn btn-primary">Submit</button>
            </form>
        )

        let message = <p style={{marginLeft:"350px"}}>{this.state.message}</p>


        console.log("Current User: ", this.state)
        console.log("Signup Props ===> ", this.props.restaurantList)
        return (
            <div>
                {form}
                {message}
            </div>
        )
    }
}

// export default Signup;

const mapStateToProps = (state) => {
    return {
        userList: state.users,
        restaurantList: state.all_restaurants
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // createNewUser: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpRestaurant)