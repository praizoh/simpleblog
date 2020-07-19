const Post = require ("../models/posts.model.js")
const uuid = require('uuid')  


exports.create = async(req,res)=>{
  const { subject, body, postedBy, categories } = req.body
  const post = new Post({subject, body, posted_by:postedBy, categories});
  post.save().then(
    () => {
      let message = 'Post Created'       
      res.render('pages/createposts', {
        message: message,
        
      });
    }
    )
    .catch(
    (error) => {
      res.status(400).json({ 
        error: error
      }); 
    }
  )
}

exports.findAll = async(req,res)=>{
    Post.find().then(
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
    Post.findOne({
      _id: id
    }).then(
        (post) => {
          res.render('pages/editposts', {
            post: post,
            
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

exports.delete = async(req,res)=>{
    const {id} = req.params
    Post.deleteOne({_id:id}).then(
        () => {
          res.render('pages/index');
        }
      ).catch(
        (error) => {
          res.status(400).json({
            error: error
          });
        }
      );
}

exports.update = async(req,res)=>{
    const { subject, body, _id} = req.body
    console.log(req.body)
    const post = new Post({subject, body, _id});
    Post.updateOne({_id}, post).then(
      () => {
        let msg = 'Post successfully updated' 
        res.render('pages/index', {
          message2: msg,
          
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