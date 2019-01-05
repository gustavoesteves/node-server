import { Document } from "mongoose";

export interface IUser {
    local?: {
        token: String,
        email: { type: String, unique: true },
        password: String,
        passwordResetToken: String,
        passwordResetExpires: Date
    },
    facebook?: {
        id: string,
        token: string,
        email: string,
        name: string
    },
    twitter?: {
        id: string,
        token: string,
        displayName: string,
        username: string
    },
    google?: {
        id: string,
        token: string,
        email: string,
        name: string
    },
    profile?: {
        name: String,
        gender: String,
        location: String,
        website: String,
        picture: String
    }
}

export interface IUserModel extends IUser, Document {
    comparePassword(password: string): boolean;
    generateAuthToken(_id: string): string;
}