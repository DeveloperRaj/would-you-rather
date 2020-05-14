const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv/config');

const questionsRoute = require('./routes/questions.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(
	process.env.DB_CONNECTION, 
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	},
);

const db = mongoose.connection;

db.on("error", () => console.log("ERROR"));
db.once("open", () => {
	console.log("Connected to db");
});

//use routes
app.use('/question', questionsRoute);

//serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	//set static folder
	app.use(express.static('client/build'));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});

}

const PORT =  process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running at port ${PORT}`));