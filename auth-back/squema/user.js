const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    id: {type: Object},
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
});

UserSchema.pre('save', function(next) {
    //Hash de la contraseña antes de guardar el usuario
    if(this.isModified('password')|| this.isNew) {
        const document = this;
        bcrypt.hash(document.password, 10, (err, hash) => {
            if(err) {
                next(err);
            }else {
                document.password = hash;
                next();
            }
        });
    } else {
        next();
    }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;