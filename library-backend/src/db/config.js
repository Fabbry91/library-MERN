const mongoose = require("mongoose");

const conectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      });
    console.log('DB connected');
  } catch (error) {
    throw new Error(console.log("error al conectar a la base"));
  }
};

module.exports = conectionDB;