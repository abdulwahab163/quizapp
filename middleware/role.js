module.exports = function (req, res, next) {
    const token = req.header("x-auth-token"); //get token from request header

    if (!token)
        return res
            .status(401)
            .send("Access denied.No token Provided. Unauthorized");
    try {
        if (req.token.role != 'ADMIN')
            return res
                .status(403)
                .send("Access denied.");
        next();
    } catch (error) {
        return res.status(403).send("Forbidden..");
    }
};
