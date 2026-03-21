const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Mongoose.Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
});

UserSchema.pre('save', async function(next) {
    // Hashear la contraseña fue modificada o es un documento nuevo
         if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }   
});
module.exports = Mongoose.model('User', UserSchema);

