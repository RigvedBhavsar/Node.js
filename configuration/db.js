const {MongoClient} = require('mongodb');

const _url =process.env.MONGODB_URL;

const dbCon = (coll , cb)=>{
    MongoClient.connect(_url)
    .then(async(client)=>{
        const db = client.db('sample_mflix').collection(coll);
        await cb(db);
        client.close();
    })
   
};

// dbCon('movies',async(db)=>{
//    const movie = await db.findOne();
//    console.log(movie);
// })

module.exports= dbCon;