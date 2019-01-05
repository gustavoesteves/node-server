import { Request } from "express";
import { UserModel } from "../models/user.model";

async function login(req: Request) {
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({ 'local.email': email });
    if (!user)
        throw new Error('Invalid email or password');
    if (await user.comparePassword(password))
        throw new Error('Invalid email or password');

    return user;
}

export default { login };