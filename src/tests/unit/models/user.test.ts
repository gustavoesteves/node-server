import { IUserModel } from "../../../interfaces/user.interface";
import { UserModel } from "../../../models/user.model";

describe('user model', () => {
    let newUser: IUserModel;

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

    afterEach(() => {
        UserModel.deleteMany({});
    });

    test('invalid password', (done) => {
        newUser.set('local.password', 'a');
        newUser.set('local.email', 'a@a.com');
        newUser.save()
            .catch(error => {
                expect(error.message).toBe('Password needs at least one special caracter and minimun 8 caracters');
                done();
            });
    });

    test('invalid email', (done) => {
        newUser.set('local.password', 'A1@aaaaa');
        newUser.set('local.email', '@a.com');
        newUser.save()
            .catch(error => {
                expect(error.message).toBe('Invalid email');
                done();
            });
    });

    test('everything alright', (done) => {
        newUser.set('local.password', 'A1@aaaaa');
        newUser.set('local.email', 'a@a.com');
        newUser.save()
            .then(value => done())
            .catch(error => done());
    });
});