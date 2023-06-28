require('dotenv').config()
const mongoose = require('mongoose')

const dbConnect = () => {
    const DB_URI = process.env.DB_URI
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(res => {
        console.log("Connection to db successfully");
    }).catch(err => console.log('Error connection', err))
}

module.exports = dbConnect