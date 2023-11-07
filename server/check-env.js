import dotenv from 'dotenv';

dotenv.config();

const onType = ({ type, required, regexp }) => ({
  type: type ?? 'string',
  required: required ?? true,
  regexp: regexp ?? null
});

const envSchema = {
  ENV: onType({}),
  PORT: onType({}),

  DB_NAME: onType({}),
  DB_USERNAME: onType({}),
  DB_PASSWORD: onType({}),
  DB_DIALECT: onType({}),
  DB_HOST: onType({}),
  DB_PORT: onType({}),

  CLOUDINARY_NAME: onType({}),
  CLOUDINARY_API_KEY: onType({}),
  CLOUDINARY_API_SECRET: onType({}),

  ACCESS_TOKEN: onType({}),
  LIFETIME_ACCESS_TOKEN: onType({})
};

(() => {
  try {
    for (const key in envSchema) {
      const { type, required, regexp } = envSchema[key];
      const value = process.env[key];

      if (required && (!value || typeof value !== type || (regexp && !regexp.test(value)))) {
        const error = regexp ? `${key} must match pattern: ${regexp}` : `${key} must be a  ${type}`;

        throw new Error(`⛔️ Validation of : ${error} ! ⛔️`);
      }
    }
    console.log(`✅ Success! Env[${process.env.ENV}] validation was successfully passed! ✅`);
  } catch (e) {
    console.log('Environment variables validation failed. Check your dotenv variables:');
    console.error(e);
    process.exit(1);
  }
})();
