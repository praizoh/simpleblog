const Complaints = require ("../models/posts.model.js")
// const uuid = require('uuid')

exports.create = async(req,res)=>{
    const { subject, body, userId } = req.body
    const complaintId = '9iuyyttt'
    const dateCreated= new Date()
   const complaint = new Complaints({subject, body, posted_by:userId, complaint_id:complaintId, date_created:dateCreated});
   complaint.save().then(
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
    Complaints.find().then(
        (complaints)=>{
            res.status(200).json({complaints})
        }
    ).catch(
        (error)=>{
            res.status(400).json({error:error})
        }
    )
    
}

exports.findOne = async(req,res)=>{
    const {id} = req.params
    Complaints.findOne({
        _id: id
    }).then(
        (complaint) => {
        res.status(200).json(complaint);
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
    Complaints.deleteOne({_id:id}).then(
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
    const { subject, body, complaintId, dateCreated, userId, _id} = req.body
    console.log(body)
    const complaint = new Complaints({subject, body, posted_by:userId, complaint_id:complaintId, date_created:dateCreated, _id});
    Complaints.updateOne({_id}, complaint).then(
        () => {
          res.status(201).json({
            message: 'Complaint updated successfully!'
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