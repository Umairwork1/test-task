const mongoose = require('mongoose');

module.exports = function(){
    const db = process.env.DB_URL || 'mongodb://localhost:27017/todo-task';
    mongoose.connect(db)
    .then(() => console.log(`connected to ${db}`))
    .catch((err) => console.log(err.message));
}
