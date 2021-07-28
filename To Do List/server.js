const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const todayDate = require(__dirname + "/date.js");

const app = express();

// const items = ["Buy Food", "Cook Food", "Eat Food"];
// const workItems = [];


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todolistDB", {useNewUrlParser: true,  useUnifiedTopology: true});

const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<--- Hit this to delete an item."
});

const defaultItems = [item1,item2,item3];


app.get("/", function(req,res){

    let day = todayDate.getDate( );

    Item.find({}, function(err,foundItems){
        if(foundItems.length === 0){
            Item.insertMany(defaultItems, function(err){
                if(err){
                    console.log(err);
                }else{
                    console.log("Successfully inserted items");
                }
            });
            res.redirect("/");
        }else{
            res.render("list", {listTitle:day, newListItems: foundItems});
        }
         
    });   
    
});

app.post("/", function(req,res) {
    const itemName = req.body.newItem;
    // if(req.body.list === "Work"){
    //     workItems.push(item);
    //     res.redirect("/work");
    // }else{
    //     items.push(item);
    //     res.redirect("/");
    // }

    const item = new Item({
        name: itemName
    });
    item.save();
    res.redirect("/");
});

app.post("/delete", function(req,res) {
    const checkedItemId = req.body.checkbox;  
    Item.findByIdAndRemove(checkedItemId, function(err){
        if(!err){
            console.log("Successfully deleted checked item");         
            res.redirect("/");
        }
    })
});

app.get("/work", function(req,res) {
    res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.get("/about", function(req,res){
    res.render("about");
});

app.listen(3000, function(){
    console.log("Server is listening at port 3000");
});