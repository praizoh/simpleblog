module.exports = app =>{
    const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
    const authentication = require('../Helpers/authentication')
    const users = require("../controllers/users.controller")
    const { verifyToken } = jwtTokenUtils
    // create a new member
    app.post("/users",  users.create)

    // user auth
    app.post("/user_auth",  users.signIn)
    // get a user by id
    app.get("/users/:id", verifyToken, users.findOne)

    // get all users
    app.get("/users", users.findAll)

    // update a user
    app.post("/users/update", verifyToken, users.update)

    // delete a user
    app.delete("/users/:id", verifyToken, users.delete)


}