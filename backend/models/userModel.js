import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        minlength: [3, 'Name must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Please Enter Your Email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please Enter Your Password'],
        minlength: [8, 'Password must be at least 6 characters'],
        select: false // Do not return password in queries
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date    

},{timestamps: true})


// PASSWORD HASHING
userSchema.pre("save" , async function(next) {
    
     // If the password is modified, hash it
    if(!this.isModified("password")) {
        return next();
    }

    this.password=await bcryptjs.hash(this.password, 10);
    next();
        
})
  

userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    });
}

userSchema.methods.verifyPassword = async function(userEnteredPassword) {
    return await bcryptjs.compare(userEnteredPassword, this.password);
}

// Generate reset password token
userSchema.methods.generatePasswordResetToken = function() {
    const resetToken= crypto.randomBytes(20).toString('hex');
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // Token valid for 30 minutes
    return resetToken;

}

export default mongoose.model('User', userSchema);