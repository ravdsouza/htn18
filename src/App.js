import React, { Component } from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';
import { Link, Switch, Route } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Home from './Home'
import Profile from './Profile'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  render() {
    return (
      <div>
        {!this.state.isLoggedIn && (
          <GoogleLogin
            clientId="671198457660-d5gotcj5u380n416mtgcrj44364affs0.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}>
          </GoogleLogin>
        )}
        {this.state.isLoggedIn && (
          <div>
            <Navbar fluid collapseOnSelect>
              <Navbar.Header>
                <Navbar.Brand>
                  <Link to="/" exact>You Pick</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
              </Navbar.Header>
              <Navbar.Collapse>
                <Nav pullRight>
                <LinkContainer to="/" exact>
                  <NavItem>Home</NavItem>
                </LinkContainer>
                <LinkContainer to="/Profile">
                  <NavItem>Profile</NavItem>
                </LinkContainer>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
            <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route path="/Profile" component={Profile}></Route>
            </Switch>
          </div>

        )}
      </div>

    );
  }

  responseGoogle(response){
    this.setState({isLoggedIn: true});
    console.log(this.state);
  }
}

export default App;
