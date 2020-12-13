const {MongoClient} = require('mongodb');

const _url ="mongodb+srv://admin:admin@sampledata.wcbxv.mongodb.net/sample_mflix?retryWrites=true&w=majority"

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