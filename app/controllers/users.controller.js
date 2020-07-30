const User = require ("../businesslogic/users.businesslogic.js")
const passwordUtils =require('../Helpers/passwordUtils')
const jwtTokenUtils = require('../Helpers/jwtTokenUtils')

const { signToken } = jwtTokenUtils

exports.create = async(req,res)=>{ 
    console.log(req.body)
    const { firstname, lastname, email, password } = req.body
    if(firstname && lastname && email && password){
        try{
            const user= { firstname, lastname, email, password }
            user.password = await passwordUtils.hashPassword(req.body.password.toLowerCase());
            const checkIfUserExists = await User.findUserByUsername(email)
            if(checkIfUserExists.length>0){
                const message = 'User email already exists'
                const {firstname, lastname, email}= req.body
                let arr =[]
                
                const user = {firstname, lastname, email}
                arr.push(user)
                res.render('pages/register', {
                    error: message,
                    user :user
                    
                });
            }else{
                const createUser = await User.create(user)
                if(createUser._id){
                    const message= 'User account created successfully! Click login to sign in'
                    res.render('pages/register', {
                        message: message
                    });
                }else{
                    const message= 'An error occured'
                    res.render('pages/register', {
                        error: message,
                        user :req.body
                        
                    });
                }  
            }
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:err})
        }
    }else{
        res.status(400).send({message:'Required fields cannot be empty'})
    }
    
    
}

// user auth 
exports.signIn = async(req,res)=>{
    console.log(req.body)
    const { email, password } = req.body 
    if(email && password){
        try{
            const checkIfUserExists = await User.findUserByUsername(email)
            console.log('-------------------here-----------------')
            console.log(checkIfUserExists)
            if(checkIfUserExists.length>0){ 
                const {_id, email, firstname, lastname, isAdmin, comments, date_created} = checkIfUserExists[0]
                // check if passwords match 
                const retrievedPassword = checkIfUserExists[0].password
                const isMatch = await passwordUtils.comparePassword(password.toLowerCase(), retrievedPassword)
                if(isMatch){
                    const tokens = signToken(_id,firstname,lastname,email,isAdmin) 
                    const user = {_id, email, firstname, lastname, isAdmin, comments, date_created, tokens}
                    console.log(user)
                    res.render('pages/dashboard', {
                        user:user,
                        posts:checkIfUserExists[0].post  
                    });
                    
                }else{
                    const message = 'Incorrect username and password'
                    res.render('pages/login', {
                        error: message,
                        
                    });
                }
            }else{
                const message = 'Incorrect username and password'
                res.render('pages/login', {
                    error: message,
                    
                });
            }
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:err})
        }
    }else{
        res.status(400).send({message:'Required fields cannot be empty'})
    }
    
    
}  

// user by id 
exports.findOne = async(req,res)=>{
    const { id } = req.params
    if(id){
        try{
            const user = await User.findOne(id)
            if(user.length>0){
                res.status(200).send(user)
            }else{
                res.status(400).send({message:'User does not exist'})
            }
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:err})
        }
    }else{
        res.status(400).send({message:'Required fields cannot be empty'})
    }
    
    
} 

// get all users
exports.findAll = async(req,res)=>{
   
    try{
        const users = await User.findAll()
        console.log(users)
        if(users.length>0){
            res.render('pages/manageusers', {
                users:users
            })
        }else{
            res.status(400).send({message:'User does not exist'})
        }
        
    }catch(err){
        console.log(err)
        res.status(500).send({message:err})
    }
    
    
    
}

// update a user
exports.update = async(req,res)=>{
    const _id= req.decoded.id
    console.log(req.body)
    const { firstname, lastname } = req.body
    if(firstname, lastname, _id){
        try{
            const profile = {firstname, lastname, _id}
            await User.update(profile)
            const person= await User.findOne(_id)
            res.render('pages/profile', {
                message:'User profile updated successfully',
                user:person
            })            
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:err})
        }
    }else{
        res.status(400).send({message:'Required fields cannot be empty'})
    }
    
    
}

// delete a user
exports.delete = async(req,res)=>{
    console.log('deleting')
    const { id } = req.params
    if(id){
        try{
            const user = await User.delete(id)
            const users = await User.findAll()
            console.log(users)
            res.render('pages/manageusers', {
                users:users,
                message:'User Account Deleted Successfully'
            })
            
            
            
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:err})
        }
    }else{
        res.status(400).send({message:'Required fields cannot be empty'})
    }
    
    
}

