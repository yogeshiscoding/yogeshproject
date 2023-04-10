const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cafeSchema = new Schema({
    title: String,
    state: String,
    locality: String,
    capacity: Number,
    phone: Number,
    Menu: String,
    image: String,
})

module.exports = mongoose.model('Cafes', cafeSchema);
