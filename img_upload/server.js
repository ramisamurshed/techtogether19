var path = require('path');
var Express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var app = Express();
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(Express.static(path.join(__dirname, 'public')));


var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/Images");
    },
    filename: function (req, file, callback) {
        callback(null, "uploadedimage.jpg");
    }
});

var upload = multer({ storage: Storage }).array("imgUploader", 3); //Field name and max count

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/show", function (req, res) {
     return res.render("imagepage");
});

app.post("/api/Upload", function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong!");
        }
       res.redirect("/show");
    });
});

app.listen(2000, function (a) {
    console.log("Listening to port 2000");
});