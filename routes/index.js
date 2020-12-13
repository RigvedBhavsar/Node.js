const authRouter = require('./auth');
const movieRouter = require('./movie');

module.exports=(app)=>{
    
    app.use('/auth',authRouter); 
    app.use(movieRouter);
    

    // app.get('/',(req,res,next)=>{
    //     res.status(200).send('Welcome to Homepage');
        
    //     //To send a JSON object
    //     // res.json({
    //     //     message:"Welcome to Homepage"
    //     // })
        
    //     //to redirect to another method
    //     //res.redirect('/user');
    // });

    // // User Normal Route
    // app.get('/user' ,(req , res , next)=>{
    //     res.send("Welcome to user Page");
    // });

    // //Route with param
    // app.get('/user/:id' ,(req , res , next)=>{
        
    //     // console.log(req.params);
    //     // console.log(req.query);

    //     //for getting host from header
    //     const host = req.get('Host');
    //     console.log(host);

    //     res.send("Welcome to user Page");
    // });

}