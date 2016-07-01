var express = require('express');
var app = express();
var PORT = process.env.PORT;

app.get('/', function(req, res){
   res.send('ToDo API Root'); 
});

//Not reserved
app.listen(PORT, process.env.IP, function(){
  console.log("Express server started on port " + PORT + '!');
 });

