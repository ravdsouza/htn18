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
    this.saveMarkers = this.saveMarkers.bind(this);
    this.state = {
      //start at e5
        currentLatLng: {
          lng: 43.5,
          lat: -80.55,
          id: 'me'
        },
        zoom: 20,
        fbLatLng: []
    }
  }

  componentWillMount(){
    this.delayedShowMarker();
    const pl = new PlacesHandler();
    pl.callApi(43.5, -80.55);
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getLocation();
      const fbdb = new FirebaseHandler();
      fbdb.readData(this.props.uniqueId, this.saveMarkers);
      this.setState({ isMarkerShown: true })
    }, 20)
  }

  render() {
    const currentLoc = [this.state.currentLatLng].concat(this.state.fbLatLng);
    return (
      <Map
        currentLocations={currentLoc}
        isMarkerShown={this.state.isMarkerShown}
      >
      </Map>
    );
  }

  saveMarkers(markers){
    const ids = Object.keys(markers);
    const fbLatLngArr = [];
    ids.forEach(function(ident){
      const fbRecord = {id: ident, lng: markers[ident].lng, lat: markers[ident].lat, name: markers[ident].name};
      fbLatLngArr.push(fbRecord);
    });
    this.setState(prevState => ({
      fbLatLng: fbLatLngArr
    }));
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
    this.setState(prevState => ({
      currentLatLng: {
          ...prevState.currentLatLng,
          lat: position.coords.latitude,
          lng: position.coords.longitude,
      }
  }));
  const fbdb = new FirebaseHandler();
  fbdb.writeData(this.props.uniqueId, position.coords.latitude, position.coords.longitude);
   }
}

export default Home;