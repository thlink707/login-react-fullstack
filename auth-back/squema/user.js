const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new Mongoose.Schema({
    username: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    password: {type: String, required: true},
});

UserSchema.pre('save', async function() {
    // Hashear la contraseña fue modificada o es un documento nuevo
         if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }   
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

UserSchema.methods.createAccesToken = function(){

};


UserSchema.methods.refreshAccesToken = function(){
    
};
module.exports = Mongoose.model('User', UserSchema);

