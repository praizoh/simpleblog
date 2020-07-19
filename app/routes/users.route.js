module.exports = app =>{
    const users = require("../controllers/users.controller")
    app.post("/users",  users.create);
}