const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userShema = mongoose.Schema({
    email: { type: String, required: true, unique = true },
    password: { type: String, required: true }
});
/* impossible de sinscrire plusieur fois avec le mm email*/
userShema.plugin(uniqueValidator);

module.exports = mongoose.model('User, userShema');