var express  = require('express');
var app      = express();                           
var mongoose = require('mongoose'); 
var con = require('../config/dbconfig.js');
var db = require('../config/collectionSchema');

module.exports = {
	view: function(req, res) {
        db.find(function(err, viewData) {
            if (err)
             return   res.send(err)
            console.log(viewData);
          return  res.json(viewData); 
        });
	}
}
