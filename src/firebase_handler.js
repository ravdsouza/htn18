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

  writeFoodScores(id, italian, japanese, chinese, mexican, indian, american, greek){
    console.log(italian);
    this.database.ref(id).once("value").then((snapshot) => {
      if (snapshot.exists()) {
        console.log("exists"); 
        this.database.ref(id).update({
          italian: italian,
          japanese: japanese,
          chinese: chinese,
          mexican: mexican, 
          indian: indian,
          american: american,
          greek: greek
        });
      } else {
        console.log("doesn't exist"); 
        this.database.ref(id).set({
          italian: italian,
          japanese: japanese,
          chinese: chinese,
          mexican: mexican, 
          indian: indian,
          american: american,
          greek: greek
        });
      }
    });
  }

  readData(id, callback) {
    this.database.ref().once("value").then((snapshot)=> {
      if (snapshot.exists()) {
        const returnData = snapshot.val();
        //we don't need your data
        delete returnData[id];
        callback(returnData);
      } else{
        console.log('no data')
      }
    });
  }
}
export default FirebaseHandler;