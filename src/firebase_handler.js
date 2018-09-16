class FirebaseHandler{
  constructor(){
      this.database = window.firebase.database();
  }
  writeData(id, latitude, longitude) {
    this.database.ref(id).once("value").then((snapshot) => {
      if (snapshot.exists()) {
        console.log("exists"); 
        this.database.ref(id).update({
          lat: latitude,
          lng: longitude,
        });
      } else {
        console.log("doesn't exist"); 
        this.database.ref(id).set({
          lat: latitude,
          lng: longitude
        });
      }
    });
  }
}
export default FirebaseHandler;