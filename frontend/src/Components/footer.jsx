import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import SignUpRestaurant from "./Sign-up-restaurant";

class Footer extends Component {
    render() {
        return (
            <div style={{ backgroundColor: "black" }}>
                <div class="w3-container w3-content" style={{ paddingTop: "20px", maxWidth: "800px", color: "grey" }} id="contact">
                    <h2 class="w3-wide w3-center">CONTACT</h2>
                    <p class="w3-opacity w3-center"><i>Feel free to drop your queries!</i></p>
                    <div class="w3-row w3-padding-32">
                        <div class="w3-col m6 w3-large w3-margin-bottom">
                            <i class="fa fa-map-marker" style={{ width: "30px" }}></i> Chicago, US<br />
                            <i class="fa fa-phone" style={{ width: "30px" }}></i> Phone: +00 151515<br />
                            <i class="fa fa-envelope" style={{ width: "30px" }}> </i> Email: mail@mail.com<br />
                        </div>
                        <div class="w3-col m6">
                            <form action="/action_page.php" target="_blank">
                                <div class="w3-row-padding" style={{ margin: "0 -16px 8px -16px" }}>
                                    <div class="w3-half">
                                        <input class="w3-input w3-border" type="text" placeholder="Name" required name="Name" />
                                    </div>
                                    <div class="w3-half">
                                        <input class="w3-input w3-border" type="text" placeholder="Email" required name="Email" />
                                    </div>
                                </div>
                                <input class="w3-input w3-border" type="text" placeholder="Message" required name="Message" />
                                <button class="w3-button w3-black w3-section w3-right" type="submit">SEND</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="seller">
                    <a style={{ marginLeft: "310px" }} href="./Sign-up-restaurant"><Link to="/signup-restaurant">Sign-up(restaurant)</Link></a>
                </div>
               {/*  <Route path="/signup-restaurant">
                    <div>
                        <SignUpRestaurant />
                    </div>
                </Route> */}
                {/* <div class="seller">
                    <a style={{marginLeft: "310px"}} href="#">Register as worker</a>
                    <a style={{marginLeft: "150px"}} href="#">Login as worker</a>
                </div> */}
            </div>
        )
    }
}

export default Footer;