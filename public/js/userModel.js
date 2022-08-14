//model singular, table or collection-plural
const mongoose = require('mongoose');

const Schema = mongoose.Schema //S is capital that is storing a class or constructor in it

const userSchema = new Schema({
    no_par: {type: Number, required: false},
    t_name: { type: String, required: false, unique: true},
    formFile:{ type: String, required: false},
    name1: { type: String, required: false},
    name2: { type: String, required: false},
    name3: { type: String, required: false},
    name4: { type: String, required: false},
    email1: { type: String, required: false, unique: true},
    c_no1: { type: Number, required: false},
    clg1: { type: String, required: false},
    year1: { type: String, required: false},
    branch1: { type: String, required: false},

    email2: { type: String, required: false, unique: true},
    c_no2: { type: Number, required: false},
    clg2: { type: String, required: false},
    year2: { type: String, required: false},
    branch2: { type: String, required: false},

    email3: { type: String, required: false, unique: true},
    c_no3: { type: Number, required: false},
    clg3: { type: String, required: false},
    year3: { type: String, required: false},
    branch3: { type: String, required: false},

    email4: { type: String, required: false, unique: true},
    c_no4: { type: Number, required: false},
    clg4: { type: String, required: false},
    year4: { type: String, required: false},
    branch4: { type: String, required: false}
    // description: { type: String},
},{timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User