const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken, } = require('../auth/generateTokens');
const getUserInfo = require('../lib/getUserInfo');
const Token = require('./token');

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

UserSchema.methods.createAccessToken = function(){
    return generateAccessToken(getUserInfo(this));
};


UserSchema.methods.refreshAccessToken = async function(){
    const refreshToken = generateRefreshToken(getUserInfo(this));
    try{
        await new Token ({token : refreshToken}).save();
        return refreshToken;
    } catch (error) {
        console.log(error);
    }
};

module.exports = Mongoose.model('User', UserSchema);

