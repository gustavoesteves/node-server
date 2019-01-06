import { connect } from "mongoose";
import { error, info } from "winston";
import { get } from "config";

export default function db(db: string) {
    connect(db, { useNewUrlParser: true })
        .then(() => info(`mongodb connected ${get('DATABASE')}...`))
        .catch(err => error(err.message));
} 