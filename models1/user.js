const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Departement= require('../models/departement');

const userSchema = new mongoose.Schema({
   name: { type: String, required: true },
   departement: { type: mongoose.Schema.Types.ObjectId, ref: 'Departement', required: true },
   email: { type: String, required: true},
   apiToken: { type: String, required: true },
   userLevel: { type: Number, required: true },
   emailVerified: { type: Date, default: null },
   lastSeen: { type: Date, default: null },
   password: { type: String, required: true },
   rememberToken: { type: String, default: null }
});

userSchema.plugin(uniqueValidator);
userSchema.index({ "email": 1,"departement":1}, { unique: true });
const User = mongoose.model('User', userSchema);

module.exports = User;
