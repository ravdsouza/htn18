import React, { Component } from 'react';
import Map from './Map'
import FirebaseHandler from './firebase_handler';

class Home extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.getLocation = this.getLocation.bind(this);
    this.setLocationCoords = this.setLocationCoords.bind(this);
    this.clickMarker = this.clickMarker.bind(this);
    this.state = {
      //start at e5
        currentLatLng: {
          lng: 43.5,
          lat: -80.55,
        },
        zoom: 20,
        showMapUI: false
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
      <div>
        <Map
          currentLocation={this.state.currentLatLng}
          isMarkerShown={this.state.isMarkerShown}
          onClickMarker={this.clickMarker}
        >
        </Map>
        {this.state.showMapUI && (
          <div>
            <p>I clicked the map</p>
          </div>
        )}
      </div>
    );
  }
  clickMarker(){
      this.setState({ showMapUI: true })
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
