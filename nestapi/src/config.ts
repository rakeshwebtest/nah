export interface AppConfig {
    SECRET: string;
    SERVERBASEPATH: string;
    DB: any;
    S3: {
        AWS_ACCESS_KEY_ID: string;
        AWS_SECRET_ACCESS_KEY: string;
        AWS_S3_BUCKET_NAME: string;
    };
}

export const APP_CONFIG: AppConfig = require('./../nah-config.json');

// export const SECRET = config.SECRET;
// export const SERVERBASEPATH = config.SERVERBASEPATH;
// export const DB = config.DB;
// export const S3Config = config.S3;