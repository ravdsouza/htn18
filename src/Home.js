import React, { Component } from 'react';
import Map from './Map'
import FirebaseHandler from './firebase_handler';
import './mapUI.css';
import './rotate.css';
import PlacesHandler from './places_handler'

class Home extends Component {
  constructor(props){
    super(props);
    console.log(props);
    this.getLocation = this.getLocation.bind(this);
    this.setLocationCoords = this.setLocationCoords.bind(this);
    this.clickMarker = this.clickMarker.bind(this);
    this.saveMarkers = this.saveMarkers.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
    this.handleChangeRadius = this.handleChangeRadius.bind(this);
    this.onGetResults = this.onGetResults.bind(this);
    this.state = {
      //start at e5
        currentLatLng: {
          lng: 43.5,
          lat: -80.55,
          name: 'me'
        },
        zoom: 20,
        showMapUI: false,
        fbLatLng: [],
        searchFinished: false
    }
  }

  componentWillMount(){
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.getLocation();
      const fbdb = new FirebaseHandler();
      fbdb.readData(this.props.uniqueId, this.saveMarkers);
      this.setState({ isMarkerShown: true })
    }, 20)
  }

  onGetResults(results){
    console.log(results);
    const resto = results.results[0];
    this.setState({result_name: resto.name, searchFinished: true});
  }

  handleSubmit(event) {
    event.preventDefault();
    const pl = new PlacesHandler();
    pl.callApi(this.state.currentLatLng.lat, this.state.currentLatLng.lng, this.state.inputPrice, this.state.inputRadius, this.onGetResults);
  }

  handleChangePrice(event) {
    this.setState({inputPrice: event.target.value});
  }

  handleChangeRadius(event) {
    this.setState({inputRadius: event.target.value});
  }

  render() {
    const currentLoc = [this.state.currentLatLng].concat(this.state.fbLatLng);
    return (
        <div class="body_main">
          <Map
            currentLocations={currentLoc}
            isMarkerShown={this.state.isMarkerShown}
            onClickMarker={this.clickMarker}
          >
          </Map>
          {(this.state.showMapUI && !this.state.searchFinished) && (
            <div class = "main_UI">
              <div class="personal">
                <div class="header">{this.state.uiName}</div>
                <ul>
                  <li><span class= "cuisine">Italian</span></li>
                  <li><span class= "cuisine">Indian</span></li>
                  <li><span class= "cuisine">Chinese</span></li>
                </ul>
              </div>
              <div class = "blue_arrow">
                <img id="blue_arrow" src={require("./media/arrow.png")} />
              </div>

              <div class = "meal_setup">
              <div class="header">Set up a meal with {this.state.uiName}!</div>
              <form id="signup" onSubmit={this.handleSubmit} >
                <label for="price">Price</label>
                <input id="price" value={this.state.inputPrice} onChange={this.handleChangePrice}/>
                <label for="radius">Distance (km)</label>
                <input id="radius" value={this.state.inputRadius} onChange={this.handleChangeRadius}/>
                <input type="submit" value="Submit" />
                </form>
              </div>
            </div>
          )}
          {this.state.searchFinished && (
            <div class = "main_UI">
              <div class="header">Let's go to {this.state.result_name}</div>
            </div>
          )}
        </div>
    );
  }
  clickMarker(name){
      this.setState({ showMapUI: true, uiName: name })
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
