const { equal } = require('@hapi/joi');
const { dbCon } = require ('../configuration');
const {userValidator} = require('../validator');
class User{
    constructor(userData){
        this.userData= {...userData}
    };
    save(){
        dbCon('users',(db)=>{
            db.insertOne(this.userData);
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
};

const userData = {
    username : "rigved",
    email :"rigved.com",
    password : "Rigved@1234",
    first_name :"rigved",
    last_name: "bhavsar"
};

const validation = User.validate(userData);