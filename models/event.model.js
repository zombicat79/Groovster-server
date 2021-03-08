const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    artist: {type: String, required: true},
    title: {type: String, required: true, unique: true},
    location: String, 
    description: {type: String, required: true},
    picture: String, 
    date: {type: String, required: true}, 
    participants: [{type: Schema.Types.ObjectId, ref:'User'}],
    creator: {type: Schema.Types.ObjectId, ref:'User'}
  }, 
);


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;