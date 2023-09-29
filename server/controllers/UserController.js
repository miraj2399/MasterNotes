const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const {GenerateToken,ValidateToken} = require('../utils/GenerateToken');
async function SignUpHandler(req, res){
    const {email, password, firstName, lastName} = req.body;
    const hasedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await User.create(
            {
                email: email,
                password: hasedPassword,
                firstName: firstName,
                lastName: lastName
            }
        )
        res.status(201).json(user);
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }
}

async function LoginHandler(req, res){
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    try {
        if (await bcrypt.compare(password, user.password)) {
            const token = GenerateToken(user);
            console.log(token);
            res.status(200).json({token: token})

        }
        else {
            res.status(401).json({message: "Unauthorized"});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }

}

const AuthenticatedHandler = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const {email, userId} = ValidateToken(token);
    const user = User.findOne({email: email, _id: userId});
    if (!user) {
        return res.status(404).json({message: "User not found"});
    }
    else {
        res.status(200).json({message: "Authenticated"});
    }
}


module.exports = {
    SignUpHandler,
    LoginHandler,
    AuthenticatedHandler
}
