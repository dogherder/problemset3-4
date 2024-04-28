var http = require('http');
var url = require('url');
var port = process.env.PORT || 3000;
//var port = 8080;   //uncomment to run local
console.log("This goes to the console window");
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  urlObj = url.parse(req.url,true)
  id = urlObj.query.id
   res.write("<h2>This is my hello application</h2>");
//   res.write ("Success!  This app is deployed online");
  res.write ("The id is: " + id)
   res.end();
  console.log('hey8')
}).listen(port);

const MongoClient = require('mongodb').MongoClient;
const url2 = "mongodb+srv://dbuser2:dbUser123@cluster0.toauqqw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
    MongoClient.connect(url2, async function(err, db) {
      if (err) { console.log(err); }
      var dbo = db.db("problemset3-4");
      var collection = dbo.collection('places');  
      await collection.insertMany(global.outputArray);
      db.close();
    });
  })
}

readFileAndCreateArray('zips.csv');
