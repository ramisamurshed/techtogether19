// required packages
var express = require('express');
var path = require('path');
var mongo = require('mongodb');
var bodyParser = require('body-parser');
var crypto = require('crypto');

// initializing express and mongodb
var app = express();
// enter the name of the database in the end
var new_db = "mongodb://localhost:27017/my_symp_tracker_db";

// server and default routes
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/index.html');
}).listen(3000);

console.log("Server listening at : 3000");
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

// function for HMAC operation on password
// using phone number of user as the key
var getHash = ( pass , phone ) => {

				var hmac = crypto.createHmac('sha512', phone);

				// passing the data to be hashed
				data = hmac.update(pass);
				// Creating the HMAC in the required format
				gen_hmac= data.digest('hex');
				// Printing the output on the console
				console.log("hmac : " + gen_hmac);
				return gen_hmac;
}

// Sign-up function starts here
app.post('/sign_up' ,function(req,res){
	var name = req.body.name;
	var email= req.body.email;
	var pass = req.body.password;
		var phone = req.body.phone;
	var password = getHash( pass , phone );


	var data = {
		"name":name,
		"email":email,
		"password": password,
		"phone" : phone
	}

	mongo.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		// CREATING A COLLECTION IN MONGODB USING NODE.JS
		db.collection("details").insertOne(data, (err , collection) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(collection);
		});
	});

	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/success.html');

});
