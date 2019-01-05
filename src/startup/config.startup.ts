import { argv, defaults, env } from "nconf";

export default function config() {
    // 1. Command-line arguments
    argv()
    // 2. Environment variables
    env([
        'CLOUD_BUCKET',
        'DATABASE',
        'GCLOUD_PROJECT',
        'NODE_ENV',
        'OAUTH2_CLIENT_ID',
        'OAUTH2_CLIENT_SECRET',
        'OAUTH2_CALLBACK',
        'PORT',
        'SECRET'
    ]);
    // 4. Defaults
    defaults({
        // Typically you will create a bucket with the same name as your project ID.
        CLOUD_BUCKET: '',

        // dataBackend can be 'datastore', 'cloudsql', or 'mongodb'. Be sure to
        // configure the appropriate settings for each storage engine below.
        // If you are unsure, use datastore as it requires no additional
        // configuration.
        DATABASE: 'mongodb://localhost/default-project',

        // This is the id of your project in the Google Cloud Developers Console.
        GCLOUD_PROJECT: '',

        OAUTH2_CLIENT_ID: '',
        OAUTH2_CLIENT_SECRET: '',
        OAUTH2_CALLBACK: '',

        PORT: 3000,

        // Set this a secret string of your choosing
        SECRET: 'keyboardcat'
    });
}