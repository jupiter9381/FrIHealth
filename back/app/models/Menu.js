const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  ingredients: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  nutritions: {
    calories: {
      type: Number,
      default: 0
    },
    fat: {
      type: Number,
      default: 0
    },
    sodium: {
      type: Number,
      default: 0
    },
    carbohydrates: {
      type: Number,
      default: 0
    },
    protein: {
      type: Number,
      default: 0
    },
    vitaminC: {
      type: Number,
      default: 0
    },
    vitaminA: {
      type: Number,
      default: 0
    },
    calcium: {
      type: Number,
      default: 0
    },
    iron: {
      type: Number,
      default: 0
    }
  },
  conditions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Condition"
    }
  ]
});

module.exports = mongoose.model("Menu", MenuSchema);
