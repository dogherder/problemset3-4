const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://dbuser2:dbUser123@cluster0.toauqqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
	  
console.log('hey')
  MongoClient.connect(url, function(err, mydb) {
    
  if(err) { console.log(err); }
  else {
    var dbo = mydb.db("problemset3-4");
	var collection = dbo.collection('places');
    console.log("Success!");
	  mydb.close();
  }
});
