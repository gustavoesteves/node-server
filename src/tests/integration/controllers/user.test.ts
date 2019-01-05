import supertest = require("supertest");
import { connect, disconnect } from "mongoose";
import { server } from "../../../server";
import { IUserModel } from "../../../interfaces/user.interface";
import { UserModel } from "../../../models/user.model";

describe('user controller', () => {
    beforeAll(async () => {
        await connect('mongodb://localhost/default-project-test', { useNewUrlParser: true });
    });

    afterAll(async () => {
        await disconnect();
    });

    async function newUser() {
        const newUser = new UserModel({
            local: {
                token: '123456789',
                email: 'a@a.com',
                password: 'A1@aaaaa',
                passwordResetToken: 'aaaaa',
                passwordResetExpires: Date.now()
            }
        });
        await newUser.save();
        return newUser;
    }

    test('Invalid email or password - email', () => {
        newUser();
        supertest(server)
            .post('/api/user/login')
            .send({ email: '@a.com', password: 'A1@aaaaa' })
            .expect(400)
            .end((err, res) => {
                if (err) throw err;
            });
    });
});