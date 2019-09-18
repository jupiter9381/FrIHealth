const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  collectionName: {
    type: String,
    unique: [true, "A collection with the same name already exists !"]
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }]
});

module.exports = mongoose.model("Collection", CollectionSchema);
