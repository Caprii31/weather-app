//creaty empty object
let projectData = {};

//require express 
const express = require('express');

//start an instance of app 
const app = express();

// dependencies 
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//cors
const cors = require('cors');
app.use(cors());

//get project folder 
app.use(express.static('Website'));

//create local server 
const port = 3000;
const server = app.listen(port,listening);

function listening(){
    console.log(`server is running on local host: ${3000}`)
};



app.get('/serverGet', addData)

function addData(req, res) {
    res.send(projectData)
    
   
}

app.post('/serverPost', postData)
function postData(req, res) {
    console.log(req.body)
    newEntry = {
        weather: req.body.temperture,
        feelings: req.body.emo,
        date : req.body.date
    }

    projectData=newEntry
    
 
}

