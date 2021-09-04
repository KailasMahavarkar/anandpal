// connection to database
const mongoose = require('mongoose');


// local
const url = 'mongodb://localhost:27017/anandpal'

// deploy 
// const url = "mongodb+srv://kai:kai@clusterzero.txf5k.mongodb.net/basic?retryWrites=true&w=majority";

const _connect = () => {
    try{
        mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('connected to MongoDB');
    }
    catch{
        console.log('Failure connecting to MongoDB')
        process.exit();
    }
}

module.exports.connect = _connect;
