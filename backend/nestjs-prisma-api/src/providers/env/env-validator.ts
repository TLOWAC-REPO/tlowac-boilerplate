import * as Joi from 'joi';

// .env.{process.env.NODE_ENV} 환경 변수 검증
export const envValidator = Joi.object({
        NODE_ENV: Joi.string().valid('local', 'test', 'dev', 'prod').default('local'),
        SERVICE_NAME: Joi.string()
                .required()
                .default("You Have to change 'SERVICE_NAME' on .env file"),
        PORT: Joi.string().default(3000),
        DATABASE_URL: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_USERNAME: Joi.string().required(),
        DATABASE_NAME: Joi.string(),
        JWT_PRIVATE_KEY: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
        GITHUB_CLIENT_ID: Joi.string().required(),
        GITHUB_CLIENT_SECRET: Joi.string().required(),
        GITHUB_CALLBACK_URL: Joi.string().required(),
        GOOGLE_CLIENT_ID: Joi.string().required(),
        GOOGLE_CLIENT_SECRET: Joi.string().required(),
        GOOGLE_CALLBACK_URL: Joi.string().required(),
});
