const dotenv = require("dotenv");
dotenv.config();
//the other way to bring in dot env
// require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: false }));

const Fruit = require("./models/fruit.js")
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`)

});
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.get("/fruits/new", (req, res) => {
    res.render("fruits/new.ejs");

})

app.post("/fruits", async (req,res) => {
    if(req.body.isReadyToEat === "on") {
        req.body.isReadyToEat = true;
    } else {
        req.body.isReadyToEat = false;
    }
    
    await Fruit.create(req.body);
    res.redirect("/fruits")
});

app.get("/fruits", async  (req,res) => {
    const allFruits = await Fruit.find()
    res.render("fruits/index.ejs", {fruits: allFruits})
})

app.get("/fruits/:fruitId", async (req, res) => {
    const foundFruit = await Fruit.findById(req.params.FruitId)
  res.send(`This route renders the show page for fruit id: ${req.params.fruitId}!`
  );
  res.render("fruits/show.ejs", { fruit: foundFruit})

});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
