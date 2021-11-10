const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 5,
    maxlength: 255,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024,
  },
});

userSchema.methods.generateAuthToken = function(){
    const jwtKey = process.env.JWT_KEY || "jwtKey";
    const token = jwt.sign({_id: this._id}, jwtKey);
    return token;
}

const User = mongoose.model('User', userSchema);

const validateUser = function(user){
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    });
    return schema.validate(user);
}

exports.validate = validateUser;
exports.User = User;