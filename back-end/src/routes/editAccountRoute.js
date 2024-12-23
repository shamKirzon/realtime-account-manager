import express from "express";
import editAccountController from "../controllers/editAccountController.js";

const editAccountRoute = express.Router();

editAccountRoute.put("/edit-account/:id", editAccountController);

export default editAccountRoute;
