var bcrypt = require('bcryptjs');

exports.passwordHash = async (password) => {
    try{
        let salt = bcrypt.genSaltSync(8);
        return bcrypt.hashSync(password, salt)
    }catch(error){
        throw "Password hash error";
    }
}

exports.comparePassword = async(request_password, db_password) => {
    return bcrypt.compareSync(request_password, db_password);
}