const Mongoose = require('mongoose');
const cafes = require('../models/cafe')

Mongoose.set('strictQuery', false);
Mongoose.connect('mongodb://0.0.0.0:27017/tr', {useNewUrlParser: true , useUnifiedTopology: true});

const db = Mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await cafes.deleteMany({});
    
    const caf = new cafes({
        title:'Zero Degree',
        state:'Delhi',
        locality:'Hudson Lane',
        capacity:200,
        phone:8978768,
        Menu:'',
        image:'https://img.freepik.com/free-photo/teenager-reading-outdoor-cafe_23-2147864005.jpg?size=626&ext=jpg&ga=GA1.2.825544470.1681076686&semt=ais',
    })
    await caf.save();
}

seedDB().then(() => {
    Mongoose.connection.close();
})
