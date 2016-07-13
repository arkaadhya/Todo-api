var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT;
var todos = [];
var todoNextId = 1;

app.use(bodyParser.json());

app.get('/', function(req, res){
   res.send('ToDo API Root'); 
});

app.get('/todos', function(req, res){
    res.json(todos);
})

app.get('/todos/:id', function(req, res){
    //res.send("Asking for the todo with the id of " + req.params.id)
    var matchedTodo;
    
    todos.forEach(function(todoItem){
        if (todoItem.id === parseInt(req.params.id, 10)) {
            matchedTodo = todoItem;
        } 
    });
    
    if (matchedTodo)
    {
        res.json(matchedTodo);
    }
    else{
        res.status(404).send();
    }
})

app.post('/todos', function(req, res){
    var body = req.body;
    //console.log('Description: ' + body.description);
    body.id = todoNextId++;
    
    //Push Data in the Array
    todos.push(body);
    res.json(body);
    
});

//Not reserved
app.listen(PORT, process.env.IP, function(){
  console.log("Express server started on port " + PORT + '!');
 });

