//Validates an email address and  ensures there is at least one non-whitespace character before and after the "@" symbol, followed by a dot and at least one non-whitespace character
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

//Validates a password. It requires a minimum of 8 characters, at least one letter, and at least one digit. Special characters (@$!%*#?&) are also allowed
function validatePassword(password) {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return re.test(password);
}

//Validates a name and allows only alphabetical characters (both uppercase and lowercase)
function validateName(name) {
    const re = /^[a-zA-Z]+$/;
    return re.test(name);
}

//Validates if the password and the confirm_password match and returns true if the passwords match, false otherwise
function validatePasswordMatch(password, confirm_password) {
    return password === confirm_password;
}

export {
    validateEmail,
    validatePassword,
    validateName,
    validatePasswordMatch
}


