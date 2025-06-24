import express from "express";
import { borrowController } from "../controllers/borrow.controller";

const borrowRoutes = express.Router();

borrowRoutes.post("/", borrowController.borrowBook);
borrowRoutes.get('/', borrowController.getBorrowSummary);

export default borrowRoutes;
