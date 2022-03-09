// const {MongoLib} = require('mongodb');
const {config} = require('../config');
const mongoose = require('mongoose');

const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@cluster0.symog.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;
mongoose.connect(MONGO_URI)
.then((response)=>console.log('connect to MOngoDB Atlas'))
.catch((error)=>console.error(error));