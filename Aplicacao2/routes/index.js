var express = require('express');
var router = express.Router();
var db = require("../db");
var Tarefas = db.Mongoose.model('tarefas', db.Schema, 'tarefas');

/* GET index. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Aplicação 2 - To-do list' });
});

/* GET select de tarefas. */
router.get('/list', function(req, res) {
   Tarefas.find({}).sort({Status: 1, Data: 1}).lean().exec(
      function (err, docs) {
        if(err) throw err;

      res.send(docs);
   });
});

/* POST insert de tarefas. */
router.post('/add', function(req, res) { 
    req.body.Status = parseInt(req.body.Status);
    var _tarefa = new Tarefas(req.body);
    _tarefa.save(function (err) {
        if (err) {
            return err;
        }
        else {
            res.redirect("/");
        }
    });
});

/* POST update de tarefas. */
router.post('/edit', function(req, res) { 
req.body.update.Status = parseInt(req.body.update.Status);
    Tarefas.update(req.body.where, req.body.update).exec(function (err) {
        if (err) {
            return err;
        }
        else {
            res.redirect("/");
        }
    });
});

/* POST delete de tarefas. */
router.post('/del', function(req, res) { 
    Tarefas.remove(req.body.where).exec(function (err) {
        if (err) {
            return err;
        }
        else {
            res.redirect("/");
        }
    });
});

module.exports = router;
