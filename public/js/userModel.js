//model singular, table or collection-plural
const mongoose = require('mongoose');

const Schema = mongoose.Schema //S is capital that is storing a class or constructor in it

const userSchema = new Schema({
    no_par: {type: Number, required: true},
    t_name: { type: String, required: true, unique: true},
    name1: { type: String, required: true},
    name2: { type: String, required: true},
    name3: { type: String, required: true},
    name4: { type: String, required: true},
    email1: { type: String, required: true, unique: true},
    c_no1: { type: Number, required: true},
    clg1: { type: String, required: true},
    year1: { type: String, required: true},
    branch1: { type: String, required: true},

    email2: { type: String, required: true, unique: true},
    c_no2: { type: Number, required: true},
    clg2: { type: String, required: true},
    year2: { type: String, required: true},
    branch2: { type: String, required: true},

    email3: { type: String, required: true, unique: true},
    c_no3: { type: Number, required: true},
    clg3: { type: String, required: true},
    year3: { type: String, required: true},
    branch3: { type: String, required: true},

    email4: { type: String, required: true, unique: true},
    c_no4: { type: Number, required: true},
    clg4: { type: String, required: true},
    year4: { type: String, required: true},
    branch4: { type: String, required: true}
    // description: { type: String},
},{timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User