//import Clarifai from 'clarifai';

class ClarifaiHandler{
	constructor(){
		this.Clarifai = require('clarifai');
		this.app = new this.Clarifai.App({
		 apiKey: '6cc375cc472944db8ddb713a4c5d365e'
		});
	}
	generateFakeInfo(){
		//populate array
		this.app.inputs.create([
		  {url: "https://familydoctor.org/wp-content/uploads/2016/11/shutterstock_186301967.jpg"},
		  {url: "https://i.ytimg.com/vi/UAwC3AmWbgI/maxresdefault.jpg"},
		  {url: "https://img.huffingtonpost.com/asset/560d4ba91900003000fdee9a.jpeg"},
		  {url: "https://www.100ita.com/blog/wp-content/uploads/2015/08/attrice-pasta1.jpg"},
		  {url: "https://images.wisegeek.com/man-and-woman-eating-pizza-smiling.jpg"},
		  {url: "https://www.superkidsnutrition.com/wp-content/uploads/2016/09/Teenage-boy-eating-chinese-food-HP.jpg"},
		  {url: "http://top-10-list.org/wp-content/uploads/2014/03/Eating-Chinese-food-helps-you-stay-slim.jpg"},
		  {url: "https://i2.wp.com/www.taiwanese-secrets.com/wp-content/uploads/ugo-eat-chinese-food.jpg"},
		  {url: "https://www.maangchi.com/wp-content/uploads/2011/07/Josephine-Marasigans-eating-ddukguk.jpg"},
		  {url: "https://i.ytimg.com/vi/fIZR5Ib1p_w/maxresdefault.jpg"},
		  {url: "https://www.scienceabc.com/wp-content/uploads/2016/08/Kite-flying-boy.jpg"},
		  {url: "http://www.theinspirationallifestyle.com/wp-content/uploads/2018/07/top-10-confidence-books.jpg"},
		  {url: "http://www.chewoutloud.com/wp-content/uploads/2018/02/thai-iced-coffee-1-683x1024.jpg"},
		  {url: "http://www.sligotennisclub.ie/wp-content/uploads/badminton-clubnight-201111.jpg"}
		]).then(
		  function(response) {
		    // do something with response
		  },
		  function(err) {
		    // there was an error
		  }
		);
	}

	searchFood(){
		const me = this;
		//filter out images with a high 'food' descriptor
		this.app.inputs.search({ concept: {name: 'food'} }).then(
		  function(response) {
		  	var hits = response.hits;
		  	var filtered = [];
		  	for(var i = 0; i < hits.length; i++) {
		  		var hit = hits[i];
		  		if (hit.score > 0.8) {
					filtered.push(hit);
		  		}
		  	}
		  	return filtered;
		  },
		  function(err) {
		    // there was an error
		  }
		).then(function(filteredStuff){
			me.triggerPredict(filteredStuff);
			console.log(filteredStuff);
		});
	}

	//apply food model to filtred list of images
	triggerPredict(arr) {
		var masterArr = [];
		for(var i = 0; i < arr.length; i++) {
			let url = arr[i].input.data.image.url;
			console.log(url);
			this.app.models.predict(this.Clarifai.FOOD_MODEL, url).then(
				function(response) {
					// console.log(response);
					var concepts = response.outputs[0].data.concepts;
					masterArr.push(concepts.slice(0,3));
				},
				function(err) {
					console.error(err);
				}
			);
		}
		this.determineCuisine(masterArr);
	}

	determineCuisine(arr) {
		let italianTotalCount, mexicanTotalCount, chineseTotalCount, greekTotalCount, indianTotalCount, japaneseTotalCount, americanTotalCount = 0;
		const italian = [
			"antipasto",
			"seafood",
			"bruschetta",
			"paella",
			"vegetable",
			"wine",
			"meat",
			"platter",
			"pizza",
			"pasta",
			"mussels",
			"meatballs",
			"sauce",
			"macaroni",
			"rizzoli"];
		const mexican = [
			"taco",
			"tortillas",
			"salsa",
			"guacamole",
			"cheese",
			"torta",
			"beans",
			"chile",
			"cheese",
			"corn",
			"burrito",
			"enchilada",
			"empanada",
			"nachos",
			"tomato"];
		const chinese = [
			"vegetable",
			"dumpling",
			"spring rolls",
			"fried rice",
			"chow mein",
			"lo mein",
			"green beans",
			"gyoza",
			"beancurd",
			"prawn",
			"pork",
			"tuna",
			"crab",
			"salmon",
			"chicken"];
		const greek = [
			"baklava",
			"tzatziki",
			"gyro",
			"ricotta",
			"quiche",
			"potato",
			"tomato",
			"green peppers",
			"meat",
			"spanakopita",
			"souvlaki",
			"pork",
			"meat",
			"bread",
			"beef",
			"cheese"];
		const indian = [
			"lentils",
			"rice",
			"biryani",
			"naan",
			"paneer",
			"samosa",
			"rasmalai",
			"curry",
			"vegetable",
			"daal",
			"chutney",
			"cheese",
			"dosa",
			"bread"];
		const japanese = [
			"salmon",
			"sushi",
			"fish",
			"seafood",
			"rice",
			"seaweed",
			"maki",
			"ramen",
			"dumpling",
			"raw",
			"pork",
			"pasta",
			"noodle"];
		const american = [
			"fries",
			"hot dog",
			"mushroom",
			"meat",
			"bacon",
			"pie",
			"cheese",
			"grilled",
			"poutine",
			"sandwich",
			"burger"];
		for(let i=0;i<arr.length;i++) {
			let descriptors = arr[i];
			let italianCount, mexicanCount, chineseCount, greekCount, indianCount, japaneseCount, americanCount = 0;
			for (const descriptor in descriptors) {
				if(italian.includes(descriptor)) {
					italianCount++;
				}
				else if(mexican.includes(descriptor)) {
					mexicanCount++;
					
				}
				else if(chinese.includes(descriptor)) {
					chineseCount++;
					
				}
				else if(greek.includes(descriptor)) {
					greekCount++;
					
				}
				else if(indian.includes(descriptor)) {
					indianCount++;
				
				}
				else if(japanese.includes(descriptor)) {
					japaneseCount++;
				}
				else {
					americanCount++;
				}
			}
			let maxCount = Math.max(italianCount, mexicanCount, chineseCount, greekCount, indianCount, japaneseCount);
			let cuisine = "";
			if (maxCount == italianCount) {
				italianTotalCount++;
			}
			else if (maxCount == mexicanCount) {
				mexicanTotalCount++;
			}
			else if (maxCount == chineseCount) {
				cuisine = "chinese";
				chineseTotalCount++;
			}
			else if (maxCount == greekCount) {
				cuisine = "greek";
				greekTotalCount++;
			}
			else if (maxCount == indianCount) {
				cuisine = "indian";
				indianTotalCount++;
			}
			else if (maxCount == japaneseCount) {
				cuisine = "japanese";
				japaneseTotalCount++;
			}
			else {
				cuisine = "american";
				americanTotalCount++;
			}
	}

	/*
	determineProfile(italianTotalCount, mexicanTotalCount, chineseTotalCount, greekTotalCount, indianTotalCount, japaneseTotalCount, americanTotalCount) {

	}
	*/

	const Total = {"italian": italianTotalCount, "mexican": mexicanTotalCount, "chinese": chineseTotalCount, "greek": greekTotalCount, "indian": indianTotalCount, "japanese": japaneseTotalCount, "american": americanTotalCount};



	return Total;
	}
}

export default ClarifaiHandler;

// clarifai.triggerPredict(filtered);




/*

// The JavaScript client works in both Node.js and the browser.


// Install the client from NPM

//npm install clarifai

// Require the client

const Clarifai = require('clarifai');

// initialize with your api key. This will also work in your browser via http://browserify.org/

const app = new Clarifai.App({
 apiKey: '6cc375cc472944db8ddb713a4c5d365e'
});

//populate array
app.inputs.create([
  {url: "https://familydoctor.org/wp-content/uploads/2016/11/shutterstock_186301967.jpg"},
  {url: "https://i.ytimg.com/vi/UAwC3AmWbgI/maxresdefault.jpg"},
  {url: "https://img.huffingtonpost.com/asset/560d4ba91900003000fdee9a.jpeg"},
  {url: "https://www.100ita.com/blog/wp-content/uploads/2015/08/attrice-pasta1.jpg"},
  {url: "https://images.wisegeek.com/man-and-woman-eating-pizza-smiling.jpg"},
  {url: "https://www.superkidsnutrition.com/wp-content/uploads/2016/09/Teenage-boy-eating-chinese-food-HP.jpg"},
  {url: "http://top-10-list.org/wp-content/uploads/2014/03/Eating-Chinese-food-helps-you-stay-slim.jpg"},
  {url: "https://i2.wp.com/www.taiwanese-secrets.com/wp-content/uploads/ugo-eat-chinese-food.jpg"},
  {url: "https://www.maangchi.com/wp-content/uploads/2011/07/Josephine-Marasigans-eating-ddukguk.jpg"},
  {url: "https://i.ytimg.com/vi/fIZR5Ib1p_w/maxresdefault.jpg"},
  {url: "https://www.scienceabc.com/wp-content/uploads/2016/08/Kite-flying-boy.jpg"},
  {url: "http://www.theinspirationallifestyle.com/wp-content/uploads/2018/07/top-10-confidence-books.jpg"},
  {url: "http://www.chewoutloud.com/wp-content/uploads/2018/02/thai-iced-coffee-1-683x1024.jpg"},
  {url: "http://www.sligotennisclub.ie/wp-content/uploads/badminton-clubnight-201111.jpg"}
]).then(
  function(response) {
    // do something with response
  },
  function(err) {
    // there was an error
  }
);

//filter out images with a high 'food' descriptor
app.inputs.search({ concept: {name: 'food'} }).then(
  function(response) {
  	var hits = response.hits;
  	var filtered = [];
  	for(i = 0; i < hits.length; i++) {
  		var hit = hits[i];
  		if (hit.score > 0.8) {
			filtered.push(hit);
  			console.log(hit.score);
  			console.log(hit.input.data.image.url)
  			//apply food model to filtred list of images
  			triggerPredict(hit)
  		}
  	}
  },
  function(err) {
    // there was an error
  }
);

function triggerPredict (arr) {
	app.models.predict(Clarifai.FOOD_MODEL, "https://samples.clarifai.com/metro-north.jpg").then(
		function(response) {
			console.log("WE CALLED THE METHOD")
			console.log(arr.length)
			// var concepts = response.outputs[0].data.concepts;
			// var arr = [];
			// for(i = 0; i < concepts.length; i++) {
			// 	var concept = concepts[i];
			// 	if(concept.value > 0.8) {
			// 		arr.push(concept);
			// 		console.log(concept);
			// 	}
			// }
		},
		function(err) {
			console.error(err);
		}
	);
}
*/


