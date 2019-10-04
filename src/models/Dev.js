const { Schema, model } = require('mongoose');

const DevSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: String,
	user: {
		type: String,
		required: true
	},
	tel: String,
	bio: String,
	languages: String,
	avatar: {
		type: String,
		required: true
	},
	likes: [{
		type: Schema.Types.ObjectId,
		ref: 'Dev'
	}],
	dislike: [{
		type: Schema.Types.ObjectId,
		ref: 'Dev'
	}]
}, {
	timestamps: true
});

module.exports = model('Dev', DevSchema);



