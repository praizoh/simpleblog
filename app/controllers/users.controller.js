const User = require ("../businesslogic/users.businesslogic.js")
exports.create = async(req,res)=>{
    const { firstname, lastname, email, username, password } = req.body
    if(firstname && lastname && email && username && password){
        try{
            const user= { firstname, lastname, email,username, password }
            const checkIfUserExists = await User.findUserByUsername(username)
            if(checkIfUserExists.length>0){
                res.status(400).send({message:'User already exists'})
            }else{
                const createUser = await User.create(user)
                if(createUser._id){
                    res.status(200).send(createUser)
                }else{
                    res.status(500).send({message:'An error occured while creating user'})
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

