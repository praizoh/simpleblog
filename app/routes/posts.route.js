module.exports = app =>{
    const posts = require("../controllers/posts.controller")
    app.post("/posts",  posts.create);
    app.get("/posts",  posts.findAll);
    app.get("/posts/:id",  posts.findOne);
    app.get("/posts/delete/:id",   posts.delete);
    app.post("/posts/update",   posts.update);
   
    
}