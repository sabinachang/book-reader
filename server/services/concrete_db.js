const mongoose = require('mongoose');
const cloudDB = 'mongodb+srv://mimishih:Mvl3IoIHFbicSEAR@bookreader-cluster.adyrc.mongodb.net/bookreader?retryWrites=true&w=majority';
const localDB = 'mongodb://127.0.0.1:27017/bookreader';
const abstract_db = require('./abstract_db')
const connectionMap = { 'cloudDB': cloudDB, 'localDB': localDB, 'cloud': cloudDB, 'local': localDB }

class db extends abstract_db {
    connectHelper(dbType) {
        const connectionURL = connectionMap[dbType]
        mongoose
            .connect(connectionURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            })
            .then(() => {
                console.log('successfully connect to ' + dbType + ' server!');
            })
            .catch((e) => console.log(e));
    }

    connect(connection_type = "cloud") {
        console.log("Connecting to: ", connection_type)
        if (!connection_type || connection_type === "cloud" || connection_type === 'local') {
            this.connectHelper(connection_type)
        } else {
            throw new Error("Unimplemented")
        }
    }

}

module.exports = db;
