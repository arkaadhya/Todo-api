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
    var queryParams = req.query;
    var filteredTodos = todos;
    
    if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true') {
        filteredTodos = _.where(todos, {completed: true});
    } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
        filteredTodos = _.where(todos, {completed: false});
    }
    
    if (queryParams.hasOwnProperty('q') && queryParams.q.length > 0) {
        filteredTodos = _.filter(filteredTodos, function(todo){
            return todo.description.toLowerCase().indexOf(queryParams.q.toLowerCase()) > -1;
        });
    }
    
    
    res.json(filteredTodos);
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

app.put('/todos/:id', function(req, res){
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    var body = _.pick(req.body, 'description', 'completed');
    var validAttributes = {};
    
    //Return skips all the code after that
    if (!matchedTodo) {
        return res.status(404).send();
    }
    
    if (body.hasOwnProperty('completed') && _.isBoolean(body.completed)) {
        validAttributes.completed = body.completed;
    } else if (body.hasOwnProperty('completed')) {
        return res.status(404).send();
    } 
    
    if (body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0) {
        validAttributes.description = body.description;
    } else if (body.hasOwnProperty('description')) {
        return res.status(404).send();
    } 
    
    //Object is passed as a reference and not as a value
    _.extend(matchedTodo, validAttributes);
    
    //Automatically sends back a 200 status code
    res.json(matchedTodo);
    
});



//Not reserved
app.listen(PORT, process.env.IP, function(){
  console.log("Express server started on port " + PORT + '!');
 });

