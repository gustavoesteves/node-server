import { connect } from "mongoose";
import { error, info } from "winston";
import { get } from "nconf";

export default function db() {
    connect(get('DATABASE'), { useNewUrlParser: true })
        .then(() => info(`mongodb connected ${get('DATABASE')}...`))
        .catch(err => error(err.message));
} 