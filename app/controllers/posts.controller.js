const Post = require ("../models/posts.model.js")


exports.create = async(req,res)=>{
    const { subject, body, userId } = req.body
    const dateCreated= new Date()
   const post = new Post({subject, body, posted_by:userId, date_created:dateCreated});
   post.save().then(
    () => {
      res.status(201).json({
        message: 'Complaint saved successfully!' 
      });
    }
    ).catch(
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
        res.status(200).json({posts})
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
        res.status(200).json(post);
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
          res.status(200).json({
            message: 'Deleted!'
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

exports.update = async(req,res)=>{
    const { subject, body, _id} = req.body
    console.log(body)
    const post = new Post({subject, body, _id});
    Post.updateOne({_id}, post).then(
      () => {
        res.status(201).json({
          message: 'Post updated successfully!'
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