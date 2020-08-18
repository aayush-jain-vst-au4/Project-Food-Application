import React, { Component } from "react";
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
// import Footer from "./Footer";

class About extends Component {
    render() {
        return (
            <div>
                <div className="w3-container w3-content w3-center w3-padding-64" style={{maxWidth: "800px",marginBottom: "25px !important", padding: "32px !important"}} id="band">
                    <h1 className="w3">This is Swizzy!</h1>
                    <p className="w3-opacity"><h2>Your food expert</h2></p>
                    <p className="w3-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="w3-row w3-padding-32">
                        <div className="w3-third">
                            <p>Item-1</p>
                            <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&auto=format&fit=crop&w=3900&q=80" className="w3-round w3-margin-bottom" alt="Random Name" style={{width:"70%"}} />
                        </div>
                        <div className="w3-third">
                            <p>Item-2</p>
                            <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80" className="w3-round w3-margin-bottom" alt="Random Name" style={{width:"70%"}} />
                        </div>
                        <div className="w3-third">
                            <p>Item-3</p>
                            <img src="data:image/jpeg;base64,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" className="w3-round" alt="Random Name" style={{width:"70%"}}/>
                        </div>
                    </div>
                    <p className="w3-opacity"><h2>Who are we?</h2></p>
                    <p className="w3-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                    <div className="w3-row w3-padding-32" style={{marginLeft:"200px"}}>
                        <div className="w3-third">
                            <p>Co-founder 1</p>
                            <img src="https://www.gstatic.com/tv/thumb/persons/532529/532529_v9_bb.jpg" className="w3-round w3-margin-bottom" alt="Random Name" style={{width:"70%"}} />
                        </div>
                        <div className="w3-third">
                            <p>Co-founder 2</p>
                            <img src="https://www.gstatic.com/tv/thumb/persons/532529/532529_v9_bb.jpg" className="w3-round w3-margin-bottom" alt="Random Name" style={{width:"70%"}} />
                        </div>
                    </div>
                    <p className="w3-opacity"><h2>How we work?</h2></p>
                    <p className="w3-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                    ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                </div>
               {/*  <Footer /> */}
            </div>
        )
    }
}

export default About;