
function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

function validatePassword(password) {
    // at least 8 characters long with at least 1 number and 1 character
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(password);
}

function validateName(name) {
    const re = /^[a-zA-Z]+$/;
    return re.test(name);
}

function validatePasswordMatch(password, confirm_password) {
    return password === confirm_password;
}

export {
    validateEmail,
    validatePassword,
    validateName,
    validatePasswordMatch
}

