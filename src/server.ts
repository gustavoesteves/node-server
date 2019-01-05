import express = require("express");
import { get } from "nconf";
import { info } from "winston";
import loginfo from "./startup/loginfo.startup";
import config from "./startup/config.startup";
import db from "./startup/db.startup";

const app = express();

loginfo();
config();
db();

const port = process.env.port || get('PORT');
export const server = app.listen(port, () => info('listening on port: ' + port));