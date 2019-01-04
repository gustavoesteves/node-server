import { argv, defaults, env } from "nconf";

export default function config() {
    // 1. Command-line arguments
    argv()
    // 2. Environment variables
    env([
        'CLOUD_BUCKET',
        'DATA_BACKEND',
        'GCLOUD_PROJECT',
        'MEMCACHE_URL',
        'MEMCACHE_USERNAME',
        'MEMCACHE_PASSWORD',
        'MYSQL_USER',
        'MYSQL_PASSWORD',
        'INSTANCE_CONNECTION_NAME',
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
        DATA_BACKEND: 'datastore',

        // This is the id of your project in the Google Cloud Developers Console.
        GCLOUD_PROJECT: '',

        DATABASE: 'mongodb://localhost/default-project',
        MYSQL_PASSWORD: '',

        OAUTH2_CLIENT_ID: '',
        OAUTH2_CLIENT_SECRET: '',
        OAUTH2_CALLBACK: 'http://localhost:8080/auth/google/callback',

        PORT: 3000,

        // Set this a secret string of your choosing
        SECRET: 'keyboardcat'
    });
}