class FirebaseHandler{
  constructor(){
      this.database = window.firebase.database();
  }
  writeData() {
    this.database.ref('testUser').set({
      username: "testName",
      email: "testEmail"
    });
  }
}
export default FirebaseHandler;