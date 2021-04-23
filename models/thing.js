const mongoose = require('mongoose');
const thingShema = mongoose.Schema({
    title: { type: String, require: true },
    description: { type: String, require: true },
    imageUrl: { type: String, require: true },
    price: { type: Number, required: true },
    price: { type: Number, require: true },

});
mongoose.exports = mongoose.model('thing, thingShema');