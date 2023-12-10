import bcrypt from 'bcrypt';
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        status: {
            type: String,
            default: 'farmer'
        }
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next)
{
    const user = this;
    if(!user.isModified('password')) return next();
    try {
        user.password = await bcrypt.hash(user.password, 10);
        next();
    } catch (error) {
        return next(error);
    }
})

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

export {User}