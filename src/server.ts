import express = require("express");
import { get } from "config";
import { info } from "winston";
import loginfo from "./startup/loginfo.startup";
import db from "./startup/db.startup";
import routes from "./startup/routes.startup";

const app = express();

loginfo();
db(get('DATABASE'));
routes(app);

const port = process.env.port || get('PORT');
export const server = app.listen(port, () => info('listening on port: ' + port));