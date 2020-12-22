const { dbCon } = require ('../configuration');
const {userValidator , logSchema} = require('../validator');
const {hashSync , compareSync} = require('bcryptjs')

class User{
    constructor(userData){
        this.userData= {...userData}
    };
    save(cb){
        dbCon('users',async(db)=>{
            try{
                const hashedPass = hashSync(this.userData['password'],12);
                this.userData['password']=hashedPass;
                db.insertOne(this.userData);
                cb();
            }catch(err){
                cb(err);
            }
        });
    }

    checkExistance(){
        return new Promise((resolve, reject)=>{
            dbCon('users',async(db)=>{
                try{

                    const user = await db.findOne({'$or':[{username:this.userData['username']},{
                        email : this.userData['email']}]});

                        if(!user){
                            resolve({
                                check :false
                            })
                        }else if(this.userData['username']===user.username){
                            resolve({
                                check:true,
                                message :'this username is already taken'
                            })
                        }else if(this.userData['email']===user.email){
                            resolve({
                                check:true,
                                message :'this email is already taken'
                            })
                        }
                }catch(err){
                    reject(err);
                }
            })
        });
    };

    static validate(userData){
        return  userValidator.validate(userData);
    };

    //Validation
    static login(userData){
        return new Promise((resolve , reject)=>{
            const validation = logSchema.validate(userData);
            if(validation.error){
                const error = new Error(validation.error.message);
                error.statusCode = 400;
                return resolve(error);
            }
            dbCon('users',async(db)=>{
                try{
                    //Find User in Database
                    const user = await db.findOne({'$or':[{username : userData['username']},
                {email : userData['username']}]},{projection:{username:1 , password :1}});

                if(!user || !compareSync(userData['password'],user.password)){
                    const error = new Error("Please Enter valid username and password");
                    error.statusCode =404;
                    return resolve(error);
                }

                resolve(user);

                }catch(err){
                    reject(err);
                }
            });
        });
    };
};

// User.login({
//     username : 'ved',
//     password : 'Ved@1234'
// })
// .then(res =>{
//     console.log(res);
// })


// const userData = {
//     username : "rigved",
//     email :"rigved.com",
//     password : "Rigved@1234",
//     first_name :"rigved",
//     last_name: "bhavsar"
// };

// const validation = User.validate(userData);

// user.checkExistance()
// .then(check=>{
//     console.log(check);
// })
// .catch(err=>console.log(err));

module.exports=User;