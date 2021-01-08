const express = require('express');
const router = express.Router();
// Route for questions
const QuestionSet = require('../models/Question.js');

router.get('/', async (req, res) => {
	try {

		const data = await QuestionSet.find();
		res.json(data);

	} catch(err) {
		res.json({message: err});
	}	
});

router.post('/update/vote', async (req, res) => {
	const {  id, optionId } = req.body.payLoad;

	try {
		const foundObject = await QuestionSet.findOne({ _id: id });
		if (foundObject) {
			if (optionId === 1) {
				foundObject.votes1 = foundObject.votes1 + 1;
			} else {
				foundObject.votes2 = foundObject.votes2 + 1;
			}
			try {
				const updatedObject = await foundObject.save();
				res.json({message: 'success'});
			} catch(err) {
				res.json({message: `ERROR: ${err}`});
			}
		}
	} catch(err) {
		res.json({message: `ERROR: ${err}`});
	}

});

module.exports = router;
