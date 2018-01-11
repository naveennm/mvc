var express  = require('express');
var app      = express();                           
var mongoose = require('mongoose');          
var bodyParser = require('body-parser');    
var methodOverride = require('method-override');
var con = require('./server/config/dbconfig.js');
var db = mongoose.model('stockdb', {
    stripcode: Number,
    stripname: String,
    currentrate: Number,
    stockloss: Number,
    target: Number
});
var crudController =  require('./server/controllers/crudController');

app.use(express.static(__dirname + '/public'));   
app.use(express.static(__dirname + '/views'));              // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use('/views', express.static(__dirname + '/views'));
app.use('/js', express.static(__dirname + '/js'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

app.get('/api/todos', function(req, res) {
    
        db.find(function(err, viewData) {
            if (err)
             return   res.send(err)
            console.log(viewData);
          return  res.json(viewData); 
        });


    
});

app.post('/api/todos', function(req, res) {

    // create a todo, information comes from AJAX request from Angular
    db.create({
        stripcode : req.body.test,
        stripname: req.body.stripname,
        currentrate: req.body.currentrate,
        stockloss: req.body.stockloss,
        target: req.body.target
    }, function(err, todo) {
        if (err)
            res.send(err);

        // get and return all the todos after you create another
        db.find(function(err, todos) {
            if (err)
                res.send(err)
            res.json(todos);
        });
    });

});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {
db.remove({
    _id : req.params.todo_id
}, function(err, todo) {
    if (err)
        res.send(err);

    // get and return all the todos after you create another
    db.find(function(err, todos) {
        if (err)
            res.send(err)
        res.json(todos);
    });
});
});



app.put('/api/todos/:id', function(req, res) {
console.log("put12",req.params.id); 


// create a todo, information comes from AJAX request from Angular
//   /Todo.updateById(req.body.id, req.body.test, function(err, result) {
db.findById(req.params.id, function (err, result){
if (err) {
    return res.json('No data found');
} 

var newvalues = 
{ 
stripcode : req.body.test,
stripname : req.body.stripname,
currentrate : req.body.currentrate,
stockloss : req.body.stockloss,
target : req.body.target
};
console.log( req.body.stripname);
console.log(req.body.test);
db.updateOne({_id:req.params.id}, {$set : newvalues}, function(err, result) {


//  Todo.updateById(req.params.todo_id, { text: req.body.text }, function(err, updatedTodo) {
  if (err) {
    return res.json(err);
  } 
  db.find(function(err, todos) {
        if (err)
            res.send(err)
        res.json(todos);
    });
});
});
});


app.listen(8080);