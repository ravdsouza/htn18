import React, { Component } from 'react';
import Map from './Map'

class Home extends Component {
  constructor(props){
    super(props);
    this.getLocation = this.getLocation.bind(this);
    this.setLocationCoords = this.setLocationCoords.bind(this);
    this.state = {
      //start at e5
        currentLatLng: {
          lng: 43.5,
          lat: -80.55,
        }
    }
  }

  componentWillMount(){
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getLocation()
      this.setState({ isMarkerShown: true })
    }, 200)
  }

  render() {
    return (
      <Map
        currentLocation={this.state.currentLatLng}
        isMarkerShown={this.state.isMarkerShown}
      >
      </Map>
    );
  }
  getLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.setLocationCoords);
    } else {
        // Browser doesn't support Geolocation
       console.log("Browser doesn't support geolocation");
    }
   }

   setLocationCoords(position){
     console.log(position.coords);
    this.setState(prevState => ({
      currentLatLng: {
          ...prevState.currentLatLng,
          lat: position.coords.latitude,
          lng: position.coords.longitude
      }
  }))
   }
}

export default Home;