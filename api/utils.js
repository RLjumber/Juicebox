// only being hit with: curl http://localhost:3000/api/posts -X POST, not for post with bearer token?

function requireUser(req, res, next) {
    if (!req.user) {
        console.log("requireUser was hit")
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action!"
        });
    }
    next();
}

module.exports = {
    requireUser
}