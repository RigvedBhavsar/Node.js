const {User} = require('../../models');
const createError = require('http-errors');


const postSignup=(req , res, next)=>{
    //This block is for validation purpose
    const validation = User.validate(req.body);
    if(validation.error){
        const error = new Error(validation.error.message);
        error.statusCode = 400;
        return next(error);
    }

    //This block is for check Existance
    const user = new User(req.body);
    user.checkExistance()
    .then(result=>{

        if(result.check){
            const error = new Error(result.message);
            error.statusCode = 409;
            return next(error);
        }
        user.save((err)=>{
            if(err){
                return next(createError(500));
            }
            res.status(201).json({
                message:'User have Register Successfully'
            })
        });
    })
    .catch(err=>next(createError(500)));
};

module.exports ={postSignup};