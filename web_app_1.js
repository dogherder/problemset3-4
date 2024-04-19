const MongoClient = require('mongodb').MongoClient;
const url = "";
	  
console.log('hey')

function main() {
	
    MongoClient.connect(url, function(err, mydb) {
        if(err) { console.log(err); }
    
        var dbo = mydb.db("problemset3-4");
	var collection = dbo.collection('places');
	var newData = {"city": "Medford", "zipcode": "02145"};
	await collection.insertOne(newData, function(err, res) {
              if (err) { return console.log(err); } 
               console.log("new document inserted");
        });
    mydb.close();
    });
}

main();
