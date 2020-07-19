const Users = require ("../models/users.model.js")

const User = function(){
}

User.create = async(user)=>{
    const {firstname, lastname, email,username, password} =user
    newuser = new Users({firstname, lastname, email,username, password});
    try{
        const adduser = await newuser.save()
        return adduser
    }catch(err){
        console.log(err)
        return err
    }
    
}

User.findUserByUsername = async(username)=>{
    try{
        const getUser = await Users.find({'username':username})
        return getUser
    }catch(err){
        console.log(err)
        return err
    }
}

 
module.exports = User