const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const mongod = new MongoMemoryServer();
const abstract_db = require('./abstract_db')


class db extends abstract_db {
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

    connect(connection_type = "test") {
        console.log("Connecting to: ", connection_type)
        if (connection_type === 'test') {
            this.connectTest()
        } else {
            throw new Error("Unimplemented")
        }
    }

    closeDatabase = async (connection_type) => {
        if (connection_type !== 'test') {
            throw new Error("Not Implemented")
        } else if (connection_type === 'test') {
            await mongoose.connection.dropDatabase();
            await mongoose.connection.close();
            await mongod.stop();
        }
    }

    clearDatabase = async (connection_type) => {
        if (connection_type !== 'test') {
            throw new Error("Not Implemented")
        } else {
            const collections = mongoose.connection.collections;
            for (const key in collections) {
                const collection = collections[key];
                await collection.deleteMany();
            }
        }
    }

}

module.exports = db;
