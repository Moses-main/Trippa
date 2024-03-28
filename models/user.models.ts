
import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
    name?: string;
    email: string;
    password: string;
}

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre<UserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});


const User = model<UserDocument>('User', userSchema);

export default User;
