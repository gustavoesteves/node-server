import express = require("express");
import { info } from "winston";
import loginfo from "./startup/loginfo";
import config from "./startup/config";

const app = express();

loginfo();
config();

const port = process.env.port || 3000;
export const server = app.listen(port, () => info('listening on port: ' + port));