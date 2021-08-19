const { Schema, model } = require("mongoose");

const rubroSchema = new Schema({
  nameRubro: { type: String, required: true, unique: true }
});


rubroSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

module.exports = model("Rubro", rubroSchema);