const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
// const ejs = require('ejs')
// const expresslayout= require('express-ejs-layouts');
var engine = require('consolidate');
//Return main object of epress functionality
const app = express();
const PORT = process.env.PORT || 3000

const mongoose = require('mongoose');
const url = 'mongodb+srv://aisa-student:%40isaStudent123@cluster0.k7noaqd.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(url);//, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("Database connected...");
});

//Set template engine
// app.set('views', __dirname + '/');
// app.engine('html', engine.mustache);
// app.set('view engine', 'html');

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/index.html"))
})
const User = require('./public/js/userModel')
app.post('/postregister',async (req,res)=>{
    const { no_par, t_name, name1, name2, name3, name4, email1, c_no1, clg1, year1, branch1,
        email2, c_no2, clg2, year2, branch2,
        email3, c_no3, clg3, year3, branch3,
        email4, c_no4, clg4, year4, branch4 } = req.body
        console.log(req.body)
    //Validate Request
    if( !no_par || !t_name || !name1 || !name2 || !name3 || !name4 || !email1 || !c_no1 || !clg1|| !year1 || !branch1 || !email2 || !c_no2 || !clg2|| !year2 || !branch2 || !email3 || !c_no3 || !clg3|| !year3 || !branch3 || !email4 || !c_no4 || !clg4|| !year4 || !branch4 ){
        // req.flash('error', 'ALl fields are required')
        console.log('ALl fields are required')
        return res.redirect('/register')
    }
    //Check existance of team name
    User.exists({ t_name: t_name}, (err,result)=>{
        if(result){
            // req.flash('error', 'Team name Already taken!')
            console.log('Team name Already taken!')
            return res.redirect('/register')
        }
    })
    const user = new User({
        no_par, t_name, name1, name2, name3, name4, email1, c_no1, clg1, year1, branch1,email2, c_no2, clg2, year2, branch2,email3, c_no3, clg3, year3, branch3,email4, c_no4, clg4, year4, branch4
    })
    user.save().then((user)=>{
        //login
        return res.redirect('/')
    }).catch(err =>{
        console.log(err);
        return res.redirect('/')
    })
    // res.render('auth/register')
    // console.log(req.body)
    // res.status(404).json({user });
})

const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})