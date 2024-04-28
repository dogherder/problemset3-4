const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://dbuser2:dbUser123@cluster0.toauqqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const readline = require('readline');
const fs = require('fs');
global.outputArray = [];	  

function readFileAndCreateArray(fileName) {
  var i = 0;
  var myFile = readline.createInterface({
    input: fs.createReadStream(fileName)
  });

  myFile.on('line', function(line) { 
    var lineArray = line.split(",");
    if (i == 0) {
      city = lineArray[0];
      zipcodeArray = [];
      zipcodeArray.push(lineArray[1]);
      console.log('New city ' + lineArray[0] + ' has been added with a zip code of ' + lineArray[1]);
    } else {
      if (lineArray[0] == city) {
        zipcodeArray.push(lineArray[1]);
        console.log('City ' + city + ' is being updated with the additional zip code ' + lineArray[1]);
      } else {
        //insert create new document
        var newData = {"city": city, "zipcode": zipcodeArray};
        global.outputArray.push(newData);
        //redefine city with new city and start a new zip array
        city = lineArray[0];
        zipcodeArray = [];
        zipcodeArray.push(lineArray[1]);
        console.log('New city ' + lineArray[0] + ' has been added with a zip code of ' + lineArray[1]);
      }
    }
    i++;
  });
  myFile.on('close', async function() {
    var newData = {"city": city, "zipcode": zipcodeArray};
    global.outputArray.push(newData);
    MongoClient.connect(url, async function(err, db) {
      if (err) { console.log(err); }
      var dbo = db.db("problemset3-4");
      var collection = dbo.collection('places');  
      await collection.insertMany(global.outputArray);
      db.close();
    });
  })
}

readFileAndCreateArray('zips.csv');
