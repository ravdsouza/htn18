// The JavaScript client works in both Node.js and the browser.


// Install the client from NPM

//npm install clarifai

// Require the client

const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: '6cc375cc472944db8ddb713a4c5d365e'
});

app.models.predict(Clarifai.FOOD_MODEL, "https://samples.clarifai.com/metro-north.jpg").then(
  function(response) {
  	var concepts = response.outputs[0].data.concepts;
  	var arr = []
  	for(i = 0; i < concepts.length; i++) {
  		var concept = concepts[i];
  		if(value > 0.9) {
  			arr.push(concept);
  			console.log(concept);
  		}
  	}
  },
  function(err) {
    console.error(err);
  }
);