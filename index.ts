import * as express from 'express';
import {
  DBConnection,
  Services
} from 'model';
import { setupRouter } from 'setup';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import * as cors from 'cors';

require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer().any());

const server = app.listen(port);

DBConnection.connect(process.env.MONGODB_URI)
  .then(async () => {
    Services.initialize(DBConnection);
    setupRouter(app);
    console.log(`Connected correctly to server -> listening on port ${port}!`)
  })
  .catch(e => {
    server.close(() => { throw e });
  });

