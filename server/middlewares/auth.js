const {ValidateToken} = require("../utils/GenerateToken");

async function auth(req,res,next){
    
    try {
        const token = req.headers.authorization.split(" ")[1];
        const {email, userId} = ValidateToken(token);
        req.userId = userId;
        req.email = email;
        next()
    }
    catch (err) {
        console.log(err);
        res.status(401).json({message: "Unauthorized"});
    }
}
module.exports = auth;
