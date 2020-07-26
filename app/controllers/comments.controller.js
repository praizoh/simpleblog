const Comment = require ("../businesslogic/comments.businessLogic.js")
const Post = require ("../models/posts.model")
const Comm = require ("../models/comments.model")

 
exports.create = async(req,res)=>{  
    console.log(req.body)
    const { comment, post } = req.body
    commentedBy = req.decoded.id
    if(comment && commentedBy){
        try{
            const coment= { comment, commentedBy, post }
            const createComment = await Comment.create(coment)
            const getpost = await Post.findOne({_id: post}).populate('posted_by')
            const getcomment= await Comm.find({'post':post}).sort({date_created: -1}).populate('commented_by')
            if(createComment._id){
                res.render('pages/viewpost',{
                    message:'Comment successfully created',
                    post:getpost,
                    comment:getcomment
                })
            }else{
                res.status(500).send({message:'An error occured while creating comment'})
            }  
            
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:err})
        }
    }else{
        res.status(400).send({message:'Required fields cannot be empty'})
    }
    
    
}
exports.viewers = async(req,res)=>{  
    console.log(req.body)
    const { comment, post } = req.body
    commentedBy = req.decoded.id
    if(comment && commentedBy){
        try{
            const coment= { comment, commentedBy, post }
            const createComment = await Comment.create(coment)
            const getpost = await Post.findOne({_id: post}).populate('posted_by')
            const getcomment= await Comm.find({'post':post}).sort({date_created: -1}).populate('commented_by')
            if(createComment._id){
                res.render('pages/viewersPost',{
                    message:'Comment successfully created',
                    post:getpost,
                    comment:getcomment
                })
            }else{
                res.status(500).send({message:'An error occured while creating comment'})
            }  
            
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:err})
        }
    }else{
        res.status(400).send({message:'Required fields cannot be empty'})
    }
    
    
} 

// comment by id 
exports.findOne = async(req,res)=>{
    const { id } = req.params
    if(id){
        try{
            const comment = await Comment.findOne(id)
            if(comment.length>0){
                res.status(200).send(comment)
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

// get all comments
exports.findAll = async(req,res)=>{
   
    try{
        const comments = await Comment.findAll()
        if(comments.length>0){
            res.status(200).send(comments)
        }else{
            res.status(400).send({message:'Comment does not exist'})
        }
        
    }catch(err){
        console.log(err)
        res.status(500).send({message:err})
    }
    
    
    
}

// update a user
exports.update = async(req,res)=>{
    const {comment, _id } = req.body
    if(comment, _id){
        try{
            await Comment.update()
            res.status(200).send({message:'Comment updated'})            
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:err})
        }
    }else{
        res.status(400).send({message:'Required fields cannot be empty'})
    }
    
    
}

// delete a comment
exports.delete = async(req,res)=>{
    const { id } = req.params
    if(id){
        try{
            const user = await Comment.delete(id)
            
            res.status(200).send({message:'comment deleted'})
            
            
        }catch(err){
            console.log(err)
            res.status(500).send({message:err})
        }
    }else{
        res.status(400).send({message:'Required fields cannot be empty'})
    }
    
    
}

