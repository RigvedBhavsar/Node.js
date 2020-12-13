const {dbCon} =require('../../configuration');
const {ObjectId} = require('bson');
const createError = require('http-errors');
const { notice } = require('../../configuration/logger');


const getMovies=(req, res, next)=>{
    const pageNum =parseInt(req.params.page);
    
    if(isNaN(pageNum)){
        //global eror handling
        return next(createError(400));
    }

    const movieToSkip = (pageNum-1)*10;

    dbCon('movies',async(db)=>{
        try{
            const movies =await db.find({}).skip(movieToSkip).limit(10).toArray();
            res.json(movies);
        }
        catch(err){
            //here we used global Error handler method of http-error with next param.
           next(createError(500));
        }
    });
};


const getOneMovie =(req , res, next)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('Bad Request');
    };
    const _id = new ObjectId(req.params.id);

    dbCon('movies',async(db)=>{
        try{
            const movie =await db.findOne({_id});
            if(!movie){
                return res.status(404).send('Not Found');
            }
            res.json(movie);
        }
        catch(err){
            //this is local error handling technique
            return res.status(500).send('Internal Server Error')
        }
        
    });
};


module.exports={
    getMovies,
    getOneMovie
}