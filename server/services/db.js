const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const cloudDB = 'mongodb+srv://mimishih:Mvl3IoIHFbicSEAR@bookreader-cluster.adyrc.mongodb.net/bookreader?retryWrites=true&w=majority';
const localDB = 'mongodb://127.0.0.1:27017/bookreader';
const connectionMap = { 'cloudDB': cloudDB, 'localDB': localDB, 'cloud': cloudDB, 'local': localDB }
const mongod = new MongoMemoryServer();

class db {
    constructor() {
    }

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

    async connectTest() {
        const uri = await mongod.getUri();
        const mongooseOpts = {
            useNewUrlParser: true,
            autoReconnect: true,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000
        };
        await mongoose.connect(uri, mongooseOpts);
    }

    connect(connection_type = "cloud") {
        console.log("Connecting to: ", connection_type)
        if (!connection_type || connection_type === "cloud") {
            this.connectHelper(connection_type)
        } else if (connection_type === "local") {
            this.connectHelper(connection_type)
        } else if (connection_type === 'test') {
            this.connectTest()
        }
    }

    closeDatabase = async (connection_type) => {
        if (!connection_type || connection_type === "cloud" || connection_type === "local") {
            throw new Error("Not Implemented")
        } else if (connection_type === 'test') {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
            await mongod.stop();
        }
    }

    clearDatabase = async (connection_type) => {
        if (!connection_type || connection_type === "cloud" || connection_type === "local") {
            throw new Error("Not Implemented")
        } else if (connection_type === 'test') {
            const collections = mongoose.connection.collections;
            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany();
            }
        }
    }

}

module.exports = db;
