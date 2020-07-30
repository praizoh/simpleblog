const Post = require ("../models/posts.model.js")
const User = require("../businesslogic/users.businesslogic")
const uuid = require('uuid')  
const Comment = require("../models/comments.model")


exports.create = async(req,res)=>{
  const { subject, body, categories } = req.body
  const postedBy = req.decoded.id
  try{
      const post = new Post({subject, body, posted_by:postedBy, categories});
      var createPost= await post.save()
      const addpostToUser= await User.addPostToUser(postedBy, createPost._id)
      console.log(addpostToUser)
      let message = 'Post Created'        
          res.render('pages/addPosts', {
        message: message,
         
      });
  }catch(err){
    console.log(err)
  }
 
}

exports.findAll = async(req,res)=>{
    Post.find().sort({date_created: -1}).then(
      (posts)=>{
        // res.status(200).json({posts})
        res.render('pages/index', {
          posts: posts,
          
        });
      }
    ).catch(
      (error)=>{
        res.status(400).json({error:error})
      }
    )
    
}

exports.findOne = async(req,res)=>{
  const {id} = req.params
  try{
    const post = await Post.findOne({_id: id}).populate('posted_by')
    // console.log(post)
    const comment= await Comment.find({'post':id}).populate('commented_by')
    // console.log(comment)
    res.render('pages/viewpost', {
      post: post,  
      comment:comment 
    })
  }catch(err){
    res.status(500).send(err)
  }
         
    
}

exports.findOneToUpdate = async(req,res)=>{
  console.log(req.params)
  const {id} = req.params
  try{
    const post = await Post.findOne({_id: id})
    console.log(post)
    // const comment= await Comment.find({'post':id}).populate('commented_by')
    // console.log(comment)
    res.render('pages/editUserPosts', {
      post: post,  
    })
  }catch(err){
    res.status(500).send(err)
  }
         
    
}
exports.viewers = async(req,res)=>{
  const {id} = req.params
  try{
    const post = await Post.findOne({_id: id}).populate('posted_by')
    // console.log(post)
    const comment= await Comment.find({'post':id}).sort({date_created: -1}).populate('commented_by')
    // console.log(comment)
    res.render('pages/viewersPost', {
      post: post,  
      comment:comment 
    })
  }catch(err){
    res.status(500).send(err)
  }
         
    
}
exports.delete = async(req,res)=>{
    const {id} = req.params
    // const postedBy = req.decoded.id
    try{
      await Post.deleteOne({_id:id})
      // const post =await Post.find({'posted_by':postedBy}).sort({date_created: -1})
      res.render('pages/dashboard', {
        posts: [],   
        message:'You successfully deleted a post'
        
      });
    }catch(err){
      res.status(500).send(err)
    }
    
}

exports.update = async(req,res)=>{
    const { subject, body, _id} = req.body
    console.log(req.body)
    const post = new Post({subject, body, _id});
    Post.updateOne({_id}, post).then(
      () => {
        let msg = 'Post successfully updated' 
        res.render('pages/editUserPosts', { 
          message: msg,
          
        });
      }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
}

exports.dashboard = async(req,res)=>{
  const id = req.decoded.id
    Post.find({'posted_by':id}).sort({date_created: -1}).then(
        (post) => {
          // console.log(post)
          res.render('pages/dashboard', {
            posts: post,   
            
          });
    }
    ).catch(
        (error) => {
        res.status(404).json({
            error: error
        });
        }
    );
    
}