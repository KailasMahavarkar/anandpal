const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { timeNow } = require('./../improve/improve')


const userSchema = new Schema({
    _id: { 
        type: Schema.ObjectId,
        auto: true 
    },
	username:{
		type: String,
		required: true
	},
	password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default : "member"
    },
	datejoined: {
		type: Number,
		default: timeNow()
	},
    uuid:{
        type: String,
        default: null,
    },
    totalViews:{
        type: Number,
        default : 0,
		required: false
    },
    pastes: {
        type: Array,
        required: false
    },
    status: {
        type: String,
		default: 'active',
        required: false
    },
    alltimeEarnings:{
        type: Number,
		default: 0,
        required: false
    },
    paidEarnings: {
        type: Number,
		default: 0,
        required: false
    },
    unpaidEarnings: {
        type: Number,
		default: 0,
        required: false
    },

});


const User = mongoose.model('user', userSchema);
module.exports = User;

