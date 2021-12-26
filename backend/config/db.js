const moongoose = require('mongoose');

const connectDB = async () => {
  const URI = process.env.MONGODB_URI;

  try {
    const conn = await moongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });

    console.log(`Databse connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error}`);
  }
};

module.exports = connectDB;
