import {fileURLToPath} from "url";
import dotenv from "dotenv";
import path  from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '..' ,`.env.${process.env.NODE_ENV || 'local'}`) });

export default {
  username: process.env.DB_USERNAME || '',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  dialect: process.env.DB_DIALECT || '',
  seederStorage: 'sequelize',
  operatorsAliases: 0,
  logging: console.log
};
// dialectOptions: {
//   ssl: {
//     require: true,
//         rejectUnauthorized: false
//   }
// }
