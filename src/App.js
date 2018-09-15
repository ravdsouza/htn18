import React, { Component } from 'react';
import './App.css';
import GoogleLogin from 'react-google-login';

class App extends Component {
  render() {
    return (
      <GoogleLogin
        clientId="671198457660-d5gotcj5u380n416mtgcrj44364affs0.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={this.responseGoogle}
      />
    );
  }

  responseGoogle(response){
    console.log(response);
  }
}

export default App;
