import express, { Express } from 'express';
import dotenv from 'dotenv';
import { todoListRoute } from './routes/todo-list.route';
import bodyParser from 'body-parser';
import connect from './connect';


dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api/lists', todoListRoute);

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at port: ${port}`);
});

const db = process.env.DB_URL || 'mongodb://localhost:27017/test';
connect({db});