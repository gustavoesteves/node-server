import { Router } from "express";
import service from "../services/user.service";

const routes = Router();

/**
 * POST /login
 * Sign in using email and password.
 */
routes.post('/login', (req, res, next) => {
    service.login(req)
        .then(value => res.json(value))
        .catch(reason => next(reason));
});

/**
* GET /logout
* Log out.
*/

/**
* GET /signup
* Signup page.
*/

/**
* GET /forgot
* Forgot Password page.
*/

/**
* POST /forgot
* Create a random token, then the send user an email with a reset link.
*/

export default routes;