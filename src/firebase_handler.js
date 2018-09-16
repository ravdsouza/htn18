class FirebaseHandler{
  constructor(){
      this.database = window.firebase.database();
  }
  writeTest() {
    this.database.ref('testUser').set({
      username: "testName",
      email: "testEmail"
    });
  }
  writeData(id, latitude, longitude) {
    this.database.ref(id).set({
      lat: latitude,
      lng: longitude
    });
  }
}
export default FirebaseHandler;