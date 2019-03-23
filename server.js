var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require("mongoose");
var new_db = "mongodb://localhost:27017/my_symp_tracker_db";

mongoose.Promise = global.Promise;
mongoose.connect(new_db, { useNewUrlParser: true });
var userSchema = new mongoose.Schema({
    name: String,
    email: String,
    pass: String,
    phone: Number
});
var User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/sign_up", (req, res) => {
    var myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("User saved to database");
        })
        .catch(err => {
            res.status(400).send("Unable to save to database");
        });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
