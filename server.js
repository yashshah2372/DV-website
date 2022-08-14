const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
// const ejs = require('ejs')
// const expresslayout= require('express-ejs-layouts');
var engine = require('consolidate');
//Return main object of epress functionality
const app = express();
const PORT = process.env.PORT || 3000
const upload = require("express-fileupload");
const AWS = require("aws-sdk");
app.use(upload());


const s3 = new AWS.S3({
    accessKeyId: 'AKIA4MUVW5KQCYWBALW4',// your AWS access id
    secretAccessKey: 'WmXXuD5L/rWO6fy6o+tDIxFwKGLoVqBR4qwAY8pp', // your AWS access key
  });

  async function uploadFile(file,folderName) {
      const params = {
        Bucket: 'profile-picture-uploader', // bucket you want to upload to
        Key: `${folderName}/-${Date.now()}.png`, // put all image to fileupload folder with name scanskill-${Date.now()}${file.name}`
        Body: file.data,
        //ACL: "public-read",
      };
      const data = await s3.upload(params).promise();
      return data.Location; // returns the url location
    }

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
const User = require('./public/js/userModel');
const { db } = require("./public/js/userModel");
app.post('/postregister',async (req,res)=>{
    //console.log(req.files.formFile)
    //console.log(result);
    let result = await uploadFile(req.files.formFile,"externalimages");
    const formFile = result;
    const { no_par, t_name, name1, name2, name3, name4, email1, c_no1, clg1, year1, branch1,
        email2, c_no2, clg2, year2, branch2,
        email3, c_no3, clg3, year3, branch3,
        email4, c_no4, clg4, year4, branch4 } = req.body
    //     console.log(req.body)
    // //Validate Request
    if( !no_par || !t_name || !name1 || !name2 || !name3 || !email1 || !c_no1 || !clg1|| !year1 || !branch1 || !email2 || !c_no2 || !clg2|| !year2 || !branch2 || !email3 || !c_no3 || !clg3|| !year3 || !branch3 ){
        // req.flash('error', 'ALl fields are required')
        console.log('ALl fields are required')
        return res.redirect('/register')
    }
    //Check existance of team name
    User.exists({ t_name: t_name}, (err,result)=>{
        if(result){
            // req.flash('error', 'Team name Already taken!')
            res.send("Team already taken")
        }
        else{
            const user = new User({
                no_par, t_name, formFile, name1, name2, name3, name4, email1, c_no1, clg1, year1, branch1,email2, c_no2, clg2, year2, branch2,email3, c_no3, clg3, year3, branch3,email4, c_no4, clg4, year4, branch4
            })
            user.save().then((user)=>{
                //login
                return res.redirect('/')
            }).catch(err =>{
                res.send('Please check all the fields again, email should be unique')
            })
        }
    })
    
    
    // const user = new User({
    //     formFile
    // })
    
})

const server = app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})