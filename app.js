const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate'); 
const methodOverride = require('method-override');


// tables
const cafes = require('./models/cafe');



mongoose.set('strictQuery', false);
mongoose.connect('mongodb://0.0.0.0:27017/tr', {useNewUrlParser: true , useUnifiedTopology: true});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.engine('ejs' , ejsMate);

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));


app.get('/' , (req , res)=>{
    res.render('home');
})

app.get('/cafes', async(req , res)=>{
    const rest = await cafes.find();
    res.render('cafes' , {rest});
})


app.get('/cafes/:id' , async(req , res)=>{
    const scafe = await cafes.findById(req.params.id);
    res.render('show' , {scafe});
})


app.listen(3000 , ()=>{
    console.log('App running on port 3000');
})