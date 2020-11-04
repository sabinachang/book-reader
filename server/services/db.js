const mongoose = require('mongoose');

const localDB = 'mongodb://127.0.0.1:27017/bookreader';


class db {
    constructor() {
        this.connect();
      }
    
    connect() {
    mongoose
        .connect(localDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            console.log('successfully connect to localDB');
        })
        .catch((e) => console.log(e));
    }
}

module.exports = new db();