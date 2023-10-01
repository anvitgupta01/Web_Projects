const express = require('express');
const path = require('path');
const app = express();
const fs= require("fs");
const port = 80;

// For including static files:
// "/static" will be the url:http://localhost:80/static will get access to the static files code:
// the "static" which is written in the bracket will be the name of folder:
app.use('/static',express.static('static'));

// Required for posting the information over server:
app.use(express.urlencoded());

// Setting the view-engine or the template-engine as pug:
app.set('view engine', 'pug');

// Connetcing with the "views" folder:
app.set('views', path.join(__dirname, 'views'));

// When there is get request for the "/":"http:localhost:80" page:
app.get('/', (req, res) => {
    res.status(200).render('index.pug',{"title":"Membership Application Form"});
})

// When form will be submitted:
app.post('/',(req,res)=>{
    console.log(req.body);
    n=req.body.name;
    number=req.body.number;
    email=req.body.email;
    address=req.body.address;
    more=req.body.more;
    let str = `The name is ${n}, number is ${number}, ${email}, ${address},${more}`;
    fs.writeFileSync('output.txt',str);
    
    const parameters={"message":"Your form has been successfully submitted"}
    
    // After submitting the form, then again show the "/" page:
    res.status(200).render("index.pug",parameters);
})

// The server/app will listen on this port:
app.listen(port, () => {
    console.log("This website is working on the port : " + port);
});