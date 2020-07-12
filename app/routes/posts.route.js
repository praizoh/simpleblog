module.exports = app =>{
    const complaints = require("../controllers/posts.controller")
    app.post("/complaint",  complaints.create);
    app.get("/complaint",  complaints.findAll);
    app.get("/complaint/:id",  complaints.findOne);
    app.delete("/complaint/:id",   complaints.delete);
    app.put("/complaint",   complaints.update);
   
    
}