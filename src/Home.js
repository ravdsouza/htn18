import React, { Component } from 'react';
import Map from './Map'
import FirebaseHandler from './firebase_handler';

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
          key: 1
        },
        zoom: 20
    }
  }

  componentWillMount(){
    this.delayedShowMarker();
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
        currentLocations={[this.state.currentLatLng, {lat: 43.255203, lng: -79.843826, key: 2}, {lng: -79.640579, lat: 43.595310, key: 3}]}
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