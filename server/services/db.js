const mongoose = require('mongoose');

const cloudDB = process.env.DB_STRING;
const localDB = 'mongodb://127.0.0.1:27017/Bookreader';


class db {
    constructor() {
        this.connect();
      }
    
    connect() {
    mongoose
        .connect(cloudDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            console.log('successfully connect to cloudDB');
        })
        .catch((e) => console.log(e));
    }
}

module.exports = new db();
