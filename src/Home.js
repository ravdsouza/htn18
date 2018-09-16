import React, { Component } from 'react';
import Map from './Map'
import FirebaseHandler from './firebase_handler';
import PlacesHandler from './places_handler'

class Home extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.getLocation = this.getLocation.bind(this);
    this.setLocationCoords = this.setLocationCoords.bind(this);
    this.state = {
      //start at e5
        currentLatLng: {
          lng: 43.5,
          lat: -80.55,
        },
        zoom: 20
    }
  }

  componentWillMount(){
    this.delayedShowMarker();
    const pl = new PlacesHandler();
    pl.callApi(43.5, -80.55);
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getLocation()
      this.setState({ isMarkerShown: true })
    }, 20)
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
     console.log(position);
    this.setState(prevState => ({
      currentLatLng: {
          ...prevState.currentLatLng,
          lat: position.coords.latitude,
          lng: position.coords.longitude
      }
  }));
  const fbdb = new FirebaseHandler();
  //fbdb.writeTest();
  fbdb.writeData(this.props.uniqueId, position.coords.latitude, position.coords.longitude);
   }
}

export default Home;