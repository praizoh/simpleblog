const  jwt =require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();
 
exports.signToken= (userId, userfirstname,userlastname, userEmail)=> {
    const key = process.env.SECRET_KEY; 
    // console.log(key)
    const token = jwt.sign({ id: userId, email: userEmail, firstname:userfirstname, lastname:userlastname}, key, { expiresIn: '1h' });
    return token;
  }
 
  exports.verifyToken= (req, res, next)=> { 
    // console.log(req.body)     
    const key = process.env.SECRET_KEY;
    // const token = req.headers.authorization || req.params.token;
    console.log(req.body)
    const token = req.body.token || req.query.token;
    if (!token) {
      res.status(403).json({ status: 403, error: 'No token provided' }); 
    }else{
      jwt.verify(token, key, (error, decoded) => {
        if (error) {
          console.log(error)
          res.render('pages/tokenExpired') 
        }else{
          req.decoded = decoded;
          // console.log(req.decoded)
          next();
        }
       
      });
    }
    
  }

