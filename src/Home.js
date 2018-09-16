import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Home extends Component {

  render() {
    return(
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCf1L8iUdSw_r-_jR2vebAbqDyn1DpAkN4" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}å
        >
        </GoogleMapReact>
      </div>
    );
  }
}

export default Home;