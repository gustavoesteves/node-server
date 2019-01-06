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
        const newUser: IUserModel = new UserModel({
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

    describe('login tests', () => {
        test('Invalid email or password - email', async () => {
            await UserModel.deleteMany({});
            await newUser();
            return supertest(server)
                .post('/api/user/login')
                .send({ email: '@a.com', password: '' })
                .expect(500)
                .then(value => {
                    expect(JSON.parse(value.text)).toBe('Invalid email or password');
                });
        });

        test('Invalid email or password - password', async () => {
            await UserModel.deleteMany({});
            await newUser();
            return supertest(server)
                .post('/api/user/login')
                .send({ email: 'a@a.com', password: 'a' })
                .expect(500)
                .then(value => {
                    expect(JSON.parse(value.text)).toBe('Invalid email or password');
                });
        });

        test('login HP', () => {
            return supertest(server)
                .post('/api/user/login')
                .send({ email: 'a@a.com', password: 'A1@aaaaa' })
                .expect(200);
        });
    });

});