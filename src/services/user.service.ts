import { IUserModel } from "../interfaces/user.interface";
import { UserModel } from "../models/user.model";

async function login(email: string, password: string) {
    const user: IUserModel = await UserModel.findOne({ 'local.email': email });

    if (!user)
        throw new Error('Invalid email or password');
    if (!await user.comparePassword(password))
        throw new Error('Invalid email or password');

    return user;
}

export default { login }