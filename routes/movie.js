const {Router} = require('express');
const {getMovies , getOneMovie} = require('../controllers/auth');
const {auth} = require('../middleware');

const router = Router();

router
.get('/movies/:page',auth ,getMovies)
.get('/movie/:id',getOneMovie)

module.exports=router;