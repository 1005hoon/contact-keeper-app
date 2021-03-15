const mongoose = require('mongoose');
const config = require('config');
const dbURI = config.get('mongoURI');

const connectDB = async () => {
  const db = await mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });

  console.log(`MONGO :: ${db.connection.name}`);
};

module.exports = connectDB;
