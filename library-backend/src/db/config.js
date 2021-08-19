const mongoose = require("mongoose");

const conectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false ,
      useCreateIndex: true,
    });
    console.log("Conectado a la base");
  } catch (error) {
    throw new Error(console.log("error al conectar a la base"));
  }
};

module.exports = conectionDB;