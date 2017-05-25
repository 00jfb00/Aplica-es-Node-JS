var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dataTarefas');

var Schema = new mongoose.Schema({
    Tarefa: String,
    Status: Number,
    Data: String
}, { collection: 'tarefas' }
);

module.exports = { Mongoose: mongoose, Schema: Schema }