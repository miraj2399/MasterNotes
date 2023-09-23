const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
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
            res.status(200).json({token:"1234567890"})
        }
        else {
            res.status(401).json({message: "Unauthorized"});
        }
    }
    catch (err) {
        res.status(500).json({message: err.message});
    }

}

module.exports = {
    SignUpHandler,
    LoginHandler
}
