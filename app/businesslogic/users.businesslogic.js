const Users = require ("../models/users.model.js")
const Post = require ("../models/posts.model.js")

const User = function(){
}

User.create = async(user)=>{
    const {firstname, lastname, email, password} =user
    newuser = new Users({firstname, lastname, email, password});
    try{
        const adduser = await newuser.save()
        return adduser
    }catch(err){
        console.log(err)
        return err
    }
    
}

User.findUserByUsername = async(email)=>{
    try{
        const getUser = await Users.find({'email':email}).populate('posts')
        getUser[0].post = await Post.find({'posted_by':getUser[0]._id}).sort({date_created: -1})
        // console.log(getUser)
        return getUser
    }catch(err){
        console.log(err)
        return err
    }
}

User.update = async(user)=>{
    const {firstname, lastname, _id} =user
    userupdate = new Users({firstname, lastname, _id}); 
    try{
        
        const updateUser = await Users.updateOne({_id}, userupdate)
        return updateUser
    }catch(err){
        console.log(err)
        return err
    }
    
}

User.delete = async(id)=>{
    try{
        const deleteUser = await Users.deleteOne({_id:id})
        return deleteUser
    }catch(err){
        console.log(err)
        return err
    }
    
}

User.findOne = async(id)=>{
    try{
        const user = await Users.findOne({_id:id})
        return user
    }catch(err){
        console.log(err)
        return err
    }
    
}

User.findAll = async()=>{
    try{
        const users = await Users.find()
        return users
    }catch(err){
        console.log(err)
        return err
    }
    
}

User.addPostToUser = async(id, post)=>{
    try{
        const addPost = await Users.findOneAndUpdate(id, {
            $push:{
                posts:post
            }
        })
        return addPost
    }catch(err){
        return err
    }
}


 
module.exports = User