import path  from 'path';
import express  from 'express';
import cors  from 'cors';
import bodyParser  from 'body-parser';
import fileUpload  from 'express-fileupload';
import dotenv from 'dotenv';
import {fileURLToPath} from "url";



import {corsConfig, headerConfig} from "./app/config";
import router  from './app/router/index.js' ;

import { notFound, error } from './app/middlewares';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: path.resolve(__dirname, `./.env.${env}`) });


const app = express();


const dir = path.join(__dirname, 'files');

app.use(express.static(dir));
app.use(cors());
app.use(headerConfig);
app.use(corsConfig);

app.use(fileUpload());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

router.API(app);

app.use(notFound);
app.use(error);





export default app;
