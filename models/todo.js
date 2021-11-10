const Joi = require('joi');
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    }
}));

function validateTodo(todo){
    const schema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string()
    });

    return schema.validate(todo);
}

exports.Todo = Todo;
exports.validate = validateTodo;