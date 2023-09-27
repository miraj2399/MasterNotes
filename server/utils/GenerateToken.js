const jwt = require('jsonwebtoken');
require('dotenv').config();

function GenerateToken(user) {
    const token = jwt.sign(
        {
            email: user.email,
            userId: user._id
        },
        process.env.JWT_SECRET
    );
    return token;
}
function ValidateToken(token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    return decodedToken;
}
module.exports = {
    GenerateToken,
    ValidateToken
}