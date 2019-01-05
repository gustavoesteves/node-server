import { model, Schema } from "mongoose";
import { sign } from "jsonwebtoken";
import { get } from "nconf";
import { compareSync, genSalt, hash } from "bcrypt";
import { IUserModel } from "../interfaces/user.interface";

const UserSchema = new Schema({
    local: {
        token: String,
        email: { type: String, unique: true },
        password: String,
        passwordResetToken: String,
        passwordResetExpires: Date
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        token: String,
        displayName: String,
        username: String
    },
    google: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    profile: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
});

UserSchema.pre('save', async function (next) {
    if (this.isModified('local.password')) {
        const salt = await genSalt(10);
        this.set('local.password', await hash(this.get('local.password'), salt));
    }
    next();
});

UserSchema.pre('validate', function (next) {
    if (this.isModified('local.email')) {
        if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(this.get('local.email')))
            throw new Error('Invalid email');
    }

    if (this.isModified('local.password')) {
        if (!/^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{7,20}$/.test(this.get('local.password')))
            throw new Error('Password needs at least one special caracter and minimun 8 caracters');
    }

    next();
});

UserSchema.method({
    comparePassword: function (password: string) {
        return compareSync(password, this.get('local.password'));
    },
    generateAuthToken: function (_id: string) {
        // const token = sign({ _id: _id }, get('SECRET'));
        const token = sign({ _id: _id }, 'SECRET');
        return token;
    }
});

export const UserModel = model<IUserModel>('User', UserSchema);