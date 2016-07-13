var express = require('express');
var bodyParser = require("body-parser");
var _ = require("underscore");
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
    // var matchedTodo;
    var todoId = parseInt(req.params.id, 10);
    // todos.forEach(function(todoItem){
    //     if (todoItem.id === parseInt(req.params.id, 10)) {
    //         matchedTodo = todoItem;
    //     } 
    // });
    
    var matchedTodo = _.findWhere(todos, {id: todoId});
    
    if (matchedTodo)
    {
        res.json(matchedTodo);
    }
    else{
        res.status(404).send();
    }
})

app.post('/todos', function(req, res){
    //var body = req.body;
    
    var body = _.pick(req.body, 'description', 'completed');
    
    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return res.status(400).send();
    }
    
    //var reqBody = _.pick(body, body.description, body.completed);
    
    body.id = todoNextId++;
    body.description = body.description.trim();
    //Push Data in the Array
    todos.push(body);
    res.json(body);
    
});

app.delete('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    
    if (matchedTodo) {
        todos = _.without(todos, matchedTodo);
        //res.json(newtodos);
        res.json(matchedTodo);
        res.status(200).send();
    } else {
        res.status(404).json({"error":"ID not found. No item will be deleted."});
    }
})

//Not reserved
app.listen(PORT, process.env.IP, function(){
  console.log("Express server started on port " + PORT + '!');
 });

