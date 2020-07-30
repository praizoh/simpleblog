module.exports = app =>{
    const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
    const { verifyToken } = jwtTokenUtils
    const posts = require("../controllers/posts.controller")
    app.post("/posts", verifyToken, posts.create);
    app.get("/posts",  posts.findAll);
    app.get("/posts/:id",  posts.findOne);
    app.get("/posts/update/:id",  posts.findOneToUpdate);
    app.get("/posts/viewers/:id",  posts.viewers);
    app.get("/posts/delete/:id",    posts.delete);
    app.post("/posts/update", verifyToken, posts.update);
    app.get('/dashboard',verifyToken, posts.dashboard)
   
    
}