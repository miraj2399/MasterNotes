async function SignUpHandler(req, res){
    res.send('SignUpHandler');
}

async function LoginHandler(req, res){
    res.send('LoginHandler');
}

module.exports = {
    SignUpHandler,
    LoginHandler
}
