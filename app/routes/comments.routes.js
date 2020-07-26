module.exports = app =>{
    const jwtTokenUtils = require('../Helpers/jwtTokenUtils')
    const comments = require("../controllers/comments.controller")
    const { verifyToken } = jwtTokenUtils
    // create a new comment
    app.post("/comments", verifyToken, comments.create)
    // create a new comment
    app.post("/comments/viewers", verifyToken, comments.viewers)
    // get a comment by id
    app.get("/comments/:id", verifyToken, comments.findOne)

    // get all comments
    app.get("/comments", verifyToken, comments.findAll)

    // update a comment
    app.put("/comments", verifyToken, comments.update)

    // delete a comment
    app.delete("/comments/:id", verifyToken, comments.delete)


}