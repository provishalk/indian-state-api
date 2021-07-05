const express = require('express')
const app = express()
const port = 3006
const mongoose = require('mongoose');
const cors = require('cors')
mongoose.connect(
    "mongodb+srv://vishal:12345@cluster0.nqdbc.mongodb.net/IndianStatesAPI?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const state = mongoose.model('State',
    {
        name: String,
        short_name: String,
        cities: [{ name: String, short_name: String }],
    }
);

app.post('/addState', (req, res) => {
    //Sample: {"name":"Uttar Pradesh","short_name": "UP"}
    //MongoDB data insertion--------------
    const newState = new state({ name: req.body.name, short_name: req.body.short_name });
    newState.save().then(() => console.log('1 Data Uploaded'));
    //------------------------------------
    res.send("Success")
})

app.post('/addCity', (req, res) => {
    // {"short_name": "UP","city":{"name":"Zamania","short_name":"ZNA"}}
    state.findOneAndUpdate({ short_name: req.body.short_name }, {$push: {cities: req.body.city}}, (err, result) => {
        console.log(err)
    })
    res.send("Success")
})

app.post('/getCity',(req,res)=>{
    state.find({ _id: req.body._id }, function (err, docs) {
        res.send(docs);
    });
})
app.get('/getAllState',(req,res)=>{
    state.find({}, function (err, docs) {
        res.send(docs);
    }); 
})
app.post('/try',(req,res)=>{
    console.log(req.body);
    res.send("ok");
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})