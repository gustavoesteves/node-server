import { connect, disconnect } from "mongoose";
import { get } from "config";
import { IUserModel } from "../../../interfaces/user.interface";
import { UserModel } from "../../../models/user.model";

describe('user model', () => {
    let newUser: IUserModel;

    beforeAll(async () => {
        await connect(get('DATABASE'), { useNewUrlParser: true });
    });

    afterAll(async () => {
        await disconnect();
    });

    beforeEach(() => {
        newUser = new UserModel({
            local: {
                token: '123456789',
                email: '',
                password: '',
                passwordResetToken: 'aaaaa',
                passwordResetExpires: Date.now()
            },
            profile: {
                name: 'aaaaa',
                gender: 'a',
                location: 'a',
                website: 'a',
                picture: 'a'
            }
        });
    });

    afterEach(async () => {
        await UserModel.deleteMany({
            profile: {
                name: 'aaaaa',
                gender: 'a',
                location: 'a',
                website: 'a',
                picture: 'a'
            }
        });
    });
;
    test('save just profile', async (done) => {
        await UserModel.deleteMany({});
        const otherUser = new UserModel({
            profile: {
                name: 'aaaaa',
                gender: 'a',
                location: 'a',
                website: 'a',
                picture: 'a'
            }
        });
        otherUser.save()
            .then(value => done())
            .catch(reason => done(reason));
    });

    test('invalid password', (done) => {
        newUser.set('local.password', 'a');
        newUser.set('local.email', 'a@a.com');
        newUser.save()
            .catch(reason => {
                expect(reason.message).toBe('Password needs at least one special caracter and minimun 8 caracters');
                done();
            });
    });

    test('invalid email', (done) => {
        newUser.set('local.password', 'A1@aaaaa');
        newUser.set('local.email', '@a.com');
        newUser.save()
            .catch(reason => {
                expect(reason.message).toBe('Invalid email');
                done();
            });
    });

    test('register user HP', (done) => {
        newUser.set('local.password', 'A1@aaaaa');
        newUser.set('local.email', 'a@a.com');
        newUser.save()
            .then(value => done())
            .catch(reason => done(reason));
    });

    test('password comparison goes wrong', (done) => {
        newUser.set('local.password', 'A1@aaaaa');
        newUser.set('local.email', 'a@a.com');
        newUser.save()
            .then(value => {
                expect(newUser.comparePassword('a')).toBeFalsy();
                done();
            })
            .catch(reason => done(reason));
    });

    test('password comparison HP', (done) => {
        newUser.set('local.password', 'A1@aaaaa');
        newUser.set('local.email', 'a@a.com');
        newUser.save()
            .then(value => {
                expect(newUser.comparePassword('A1@aaaaa')).toBeTruthy();
                done();
            })
            .catch(reason => done(reason));
    });

    test('generation token goes wrong', (done) => {
        newUser.set('local.password', 'A1@aaaaa');
        newUser.set('local.email', 'a@a.com');
        newUser.save()
            .then(value => {
                done(expect(newUser.generateAuthToken('a')).not.toBe('a'));
            })
            .catch(reason => done(reason));
    });

    test('generation token HP', async (done) => {
        newUser.set('local.password', 'A1@aaaaa');
        newUser.set('local.email', 'a@a.com');
        newUser.save()
            .then(value => {
                const token = newUser.generateAuthToken(newUser.get('_id'));
                done(expect(newUser.generateAuthToken(newUser.get('_id'))).toBe(token));
            })
            .catch(reason => done(reason));
    });
});