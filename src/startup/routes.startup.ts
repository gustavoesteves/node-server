import { Application } from "express";
import { initialize, session } from "passport";
import { get } from "nconf";
import { json, urlencoded } from "body-parser";
import expressSession = require("express-session");

export default function routes(app: Application) {
    // set up our express application
    app.use(json());
    app.use(urlencoded({ extended: true }));

    // required for passport
    app.use(expressSession({
        resave: true,
        saveUninitialized: true,
        secret: get('SECRET')
    }));
    app.use(initialize());
    app.use(session());
    
    // routes
}