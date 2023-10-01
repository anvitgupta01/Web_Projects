const express = require("express");
const app = express();
const path = require("path");
const port = 8000;
const mongoose = require('mongoose');

// Body parser is required when we are taking information entered by the user via "express":
// const parser = require("body-parser");

// Connecting through anvitgupta database, if not exists then it will create one:
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/anvitgupta');
}

// If some error occured in main(), then it will catch that error:
main().catch(err => console.log(err));

// Creating a schema:
const kittySchema = new mongoose.Schema({
   "name":String,
   "number":String,
   "email":String,
   "age":String,
   "DOB":String,
   "concern":String
})

// Model/compiled schema creation:
const Kitten = mongoose.model('Kitten', kittySchema);



// For importing static files accessed via url: http://localhost:8000/static: 
app.use('/static',express.static('static'));

// Required when taking post request via "express":
app.use(express.urlencoded());


app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));


app.get("/",(req,res)=>{
    res.status(200).render('index.pug',{"title":"Akansha Dance Academy"});
});

app.get("/contact",(req,res)=>{
    res.status(200).render('contact.pug');
})

app.get("/about",(req,res)=>{
    res.status(200).render('About.pug');
})

app.get("/classInfo",(req,res)=>{
    res.status(200).render('classInfo.pug');
})

// Note that post request from "/contact" :
app.post("/contact",(req,res)=>{
    const rew = new Kitten(req.body);

    // save() will always return a promise:
    rew.save().then((value)=>{
        res.status(200).send("Your form has been successfully submitted.")
    }).catch((error)=>{
        res.status(400).send("Some error occured. Please retry.")
    })
})

app.listen(port,()=>{
    console.log("This is running on port : "+ port);
})