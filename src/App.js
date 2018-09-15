import React, { Component } from 'react';
import './App.css';
import { Link, Switch, Route } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import Home from './Home'
import Profile from './Profile'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.responseGoogleSuccess = this.responseGoogleSuccess.bind(this);
    this.responseGoogleFailure = this.responseGoogleFailure.bind(this);
  }

  render() {
    return (
      <div>
        {!this.state.isLoggedIn && (
          <div>
            <Button bsStyle="primary" onClick={attemptLogin}>Click to Login</Button>
          </div>
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

  responseGoogleSuccess(response){
    this.setState({isLoggedIn: true});
    this.testAPI();
    console.log(response);
  }
  responseGoogleFailure(response){
    console.log("cannot log you in");
  }
}

function attemptLogin(){
  const scope = ['https://www.googleapis.com/auth/photoslibrary', 'https://www.googleapis.com/auth/photoslibrary.readonly'];
  window.gapi.auth.authorize(
    {
        'client_id': "671198457660-d5gotcj5u380n416mtgcrj44364affs0.apps.googleusercontent.com",
        'scope': scope,
        'immediate': false
    },
    handlePhotoApiAuthResult);
  
  // return fetch('/auth/google')
  //   .then((response) => response.json())
  //   .then(data => {
  //     console.log(data);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
}

function handlePhotoApiAuthResult(authResult) {
  if (authResult && !authResult.error) {
      const oauthToken = authResult.access_token;
      getAllPhotoGoogleApi();
  }
}

function getAllPhotoGoogleApi() {
    window.gapi.client.request({
    'path': 'https://photoslibrary.googleapis.com/v1/mediaItems:search',
    'method': 'POST',
    'body': {
        "filters": {
            "mediaTypeFilter": {
                "mediaTypes": ["PHOTO"]
            },
            "contentFilter": {
              "includedContentCategories": [
                "FOOD"
              ]
            }
        }
    }
  }).then(function (response) {
    console.log(response);
    //downloadImage(response.result.mediaItems[0].baseUrl);
  }, function (reason) {
    console.log(reason);
  });
}

function downloadImage(baseurl){
  const url = baseurl + "=d";
  console.log(url);

  window.gapi.client.request({
    'path': url,
    'method': 'GET',
  }).then(function (response) {
    console.log(response);
  }, function (reason) {
    console.log(reason);
  });

}

export default App;
