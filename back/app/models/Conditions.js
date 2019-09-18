const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ConditionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  menus: [{ type: Schema.Types.ObjectId, ref: "Menu" }],
  minerals: []
});

module.exports = mongoose.model("Condition", ConditionSchema);
