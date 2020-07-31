const Comments = require ("../models/comments.model.js")

const Comment = function(){
}

Comment.create = async(commen)=>{
    const {comment, commentedBy, post} =commen
    newcomment = new Comments({comment, commented_by:commentedBy, post:post});
    try{
        const addcomment = await newcomment.save()
        return addcomment
    }catch(err){
        console.log(err)
        return err
    }
    
}

Comment.update = async(commen)=>{
    const {comment, _id} =commen
    commentupdate = new Comments({comment, _id}); 
    try{
        
        const updateComment = await Comments.updateOne({_id}, commentupdate)
        console.log(updateComment)
        return updateComment
    }catch(err){
        console.log(err)
        return err
    }
    
}

Comment.delete = async(id)=>{
    try{
        const deleteComment = await Comments.deleteOne({_id:id})
        return deleteComment
    }catch(err){
        console.log(err)
        return err
    }
    
}

Comment.findOne = async(id)=>{
    try{
        const comment = await Comments.findOne({_id:id}).populate('commented_by')
        return comment
    }catch(err){
        console.log(err)
        return err
    }
    
}

Comment.findAll = async()=>{
    try{
        const comment = await Comments.findOne()
        return comment
    }catch(err){
        console.log(err)
        return err
    }
    
}
 
module.exports = Comment