import express from "express";
import cors from "cors";
import { createDatabaseConnection } from "./database/createConnection";

const establishDatabaseConnection = async () => {
  try {
    await createDatabaseConnection();
  } catch (error) {
    console.log(error);
  }
};

const initializeExpress = (): void => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // app.get("/issues", issues.getProjectIssues);

  app.listen(process.env.PORT || 3000);
};

const initializeApp = async () => {
  await establishDatabaseConnection();
  initializeExpress();
};

initializeApp();
