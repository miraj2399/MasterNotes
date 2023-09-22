const User = require('../models/UserModel');
async function SignUpHandler(req, res){
    const {email, password, firstName, lastName} = req.body;
    console.log("REQ BODY: " + JSON.stringify(req.body));
    try {
        const user = await User.create({email, password, firstName, lastName});
        res.status(201).json(user);
    }
    catch (err) {
        res.status(400).json({message: err.message});
    }
}

async function LoginHandler(req, res){
    res.send('LoginHandler');
}

module.exports = {
    SignUpHandler,
    LoginHandler
}
