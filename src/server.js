const express = require('express');

const app = express();
const port = process.env.PORT || 4000;

const Request = require("request");

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

app.get('/api/hello', (req, res) => {
  res.send({ "hi": 'Hello From Express' });
});

app.get('/api/places', (req, res) => {
    const url = "https://maps.googleapis.com/maps/api/place/textsearch/json?location=" + req.query.lat + "," + req.query.long + "&radius=1500&query=Italian&type=restaurant&key=AIzaSyDft_87yWQ-GKW9ZAoLTxgF6PW-qAolxaU"
    Request.get(url, (error, response, body) => {
        if(error) {
            return console.dir(error);
        }
        res.send(JSON.parse(body))
    });
})

app.listen(port, () => console.log(`Listening on port ${port}`));