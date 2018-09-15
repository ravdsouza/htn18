const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');

const app = express();
app.set('port', 4000);

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/api/ping', function (req, res) {
    res.json({ data: 'mare' });
});

app.listen(4000);
console.log('Hello 4000');
