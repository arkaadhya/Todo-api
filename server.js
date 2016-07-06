var express = require('express');
var app = express();
var PORT = process.env.PORT;
var todos = [{
    id: 1,
    description: 'Meet mom for lunch',
    completed: false
}, {
    id: 2,
    description: 'Go to market',
    completed: false
}, {
    id: 3,
    description: 'Pay Credit card bill',
    completed: true
}];

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

//Not reserved
app.listen(PORT, process.env.IP, function(){
  console.log("Express server started on port " + PORT + '!');
 });

