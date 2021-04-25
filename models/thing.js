const mongoose = require('mongoose');

const thingSchema = mongoose.Schema({

    imageUrl: { type: String },

});

module.exports = mongoose.model('Thing', thingSchema);