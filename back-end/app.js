import express from "express";
import cors from "cors";
import createAccountRoute from "./src/routes/createAccountRoute.js";
import editAccountRoute from "./src/routes/editAccountRoute.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", createAccountRoute);
app.use("/api", editAccountRoute);

export default app;
