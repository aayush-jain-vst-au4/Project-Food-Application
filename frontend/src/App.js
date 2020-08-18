import React from 'react';
import { BrowserRouter, Route, Link, Redirect } from "react-router-dom";
import "./App.css"
import Navbar from './Components/navbar';
import Footer from './Components/footer';

class App extends React.Component {
  render(){
    return(
      <div>
        <BrowserRouter>
        <Navbar />
        <Footer />
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
