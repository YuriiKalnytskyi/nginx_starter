import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Sequelize from 'sequelize';

import dbPostgres   from '../../../app/config/db-postgre.config';

const sequelize = new Sequelize(dbPostgres.database, dbPostgres.username, dbPostgres.password, {
  host: process.env.DB_HOST_DOCKER_CONTAINER_NAME,
  dialect: dbPostgres.dialect,
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const files = fs
    .readdirSync(__dirname)
    .filter(
        (file) =>
            file.indexOf('.') !== 0 &&
            file !== path.basename(__filename) &&
            file.slice(-3) === '.js',
    );

const models = {};
for (const file of files) {
  const { default: model } = await import(`./${file}`);
  models[model.name] = model.init(sequelize, Sequelize);
}
Object.values(models)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(models));

export default {
  ...models,
  sequelize,
  Sequelize,
};

