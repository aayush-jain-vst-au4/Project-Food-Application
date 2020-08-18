import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

class AddItemToMenu extends React.Component {
    state = {
        item_name: "",
        cuisine_name: "",
        type: "",
        item_price: "",
        message: "Click here to add new item!"
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit = (e) => {
        console.log("submittttttttt")
        if (this.state.name == "" || this.state.type == "" || this.state.address == "" || this.state.contact_email == "" || this.state.contact_mobile == "" || this.state.password == "") {
            this.setState({
                message: "Please fill all the inputs"
            })
        } else {
            this.setState({
                message: "This item has been successfully added to your menu!"
            })

            let newItem = {
                item_name: this.state.item_name,
                cuisine_name: this.state.cuisine_name,
                type: this.state.type,
                item_price: this.state.item_price,
                restaurant_id: this.props.restaurant_id
            }

            axios.post(`http://localhost:3020/menu`, newItem)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                }).catch(error => {
                    console.log(error)
                })

            this.setState({
                item_name: "",
                cuisine_name: "",
                type: "",
                item_price: "",
                message: "Click here to add new item!"
            })
        }
    }


    render() {
        let form
        if (this.props.loggedInRestaurantStatus === true) {
            form = (
                <div className="user-form">
                    <div className="form-group">
                        <label>Enter Item Name</label>
                        <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.item_name} name="item_name" aria-describedby="emailHelp" required />
                    </div>
                    <div className="form-group">
                        <label>Enter Cuisine Name</label>
                        <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.cuisine_name} name="cuisine_name" aria-describedby="emailHelp" required />
                    </div>
                    <div className="form-group">
                        <label>Enter Type</label>
                        <input type="text" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.type} name="type" aria-describedby="emailHelp" required />
                    </div>
                    <div className="form-group">
                        <label>Enter Item Price</label>
                        <input type="integer" onChange={(e) => { this.handleChange(e) }} className="form-control" value={this.state.item_price} name="item_price" aria-describedby="emailHelp" required />
                    </div>
                    <button onClick={(e) => { this.submit(e) }} type="submit" className="btn btn-primary">Submit</button>
                    <p>{this.state.message}</p>
                </div>
            )
        } else {
            form = (
                <div style={{height: '450px'}}>
                    <b>Please login to continue</b>
                </div>
            )
        }

        console.log("Current State: ", this.state)
        // console.log("Signup Props ===> ", this.props.restaurantList)
        return (
            <div>
                {form}
            </div>
        )
    }
}

// export default Signup;

const mapStateToProps = (state) => {
    return {
        userList: state.users,
        restaurantList: state.all_restaurants,
        restaurant_id: state.currentRestaurantID,
        loggedInRestaurantStatus: state.loggedInRestaurant
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // createNewUser: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddItemToMenu)