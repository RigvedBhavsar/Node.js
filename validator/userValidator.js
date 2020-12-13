const joi = require('@hapi/joi');

const schema = new joi.object({
    username : joi.string().alphanum().required().min(3).max(10),
    email : joi.string().required(),
    password : joi.string().pattern
    (new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
    ).message("your password must have least 8 character and contains 1 upppercase ,1 lowercase, 1 Number and 1 special symbol ") 
    .required(),
    first_name : joi.string().required(),
    last_name : joi.string().required()
});

module.exports = schema;