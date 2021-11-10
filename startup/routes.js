const express = require('express');
const todos = require('../routes/todos');
const auth = require('../routes/auth');

module.exports = function(app){
    app.use(express.json());
    app.use('/api/todos', todos);
    app.use('/api/auth', auth);
}