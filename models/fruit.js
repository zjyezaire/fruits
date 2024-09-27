const mongoose = require("mongoose");

const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

module.exports = Fruit;

/*
module.exports = mongoose.model("Fruit", new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
})
)
*/