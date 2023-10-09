import express, { json } from "express";
import dotenv from "dotenv";
import todoRoutes from './routes/index.router';
import database from './config/db';

const app = express();
app.use(json());  // registering this middleware for accepting json requests

dotenv.config(); //Reads .env file and makes it accessible via process.env

database.sync({alter: true}); //syncing the Database model

app.use('', todoRoutes); // All route must precees with this path

app.listen(process.env.PORT, () => {
  console.log(`Server is running at ${process.env.PORT}`);
});
