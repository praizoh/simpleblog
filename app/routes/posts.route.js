module.exports = app =>{
    const posts = require("../controllers/posts.controller")
    app.post("/posts",  posts.create);
    app.get("/posts",  posts.findAll);
    app.get("/posts/:id",  posts.findOne);
    app.delete("/posts/:id",   posts.delete);
    app.put("/posts",   posts.update);
   
    
}