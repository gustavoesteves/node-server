import { deserializeUser, serializeUser, use } from "passport";
import { Strategy } from "passport-http-bearer";
import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/user.interface";

export default function auth() {
    // used to serialize the user for the session
    serializeUser((user: IUser, done) => {
        done(null, user);
    });

    // used to deserialize the user
    deserializeUser((id, done) => {
        UserModel.findById(id, (err, user) => {
            done(err, user);
        });
    });

    use(new Strategy((token, done) => {

    }));
}