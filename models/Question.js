const mongoose = require('mongoose');

const QuestionsSchema = mongoose.Schema({
	question1: String,
	question2: String,
	votes1: Number,
	votes2: Number
});

module.exports = mongoose.model('QuestionsSet', QuestionsSchema, 'questions');