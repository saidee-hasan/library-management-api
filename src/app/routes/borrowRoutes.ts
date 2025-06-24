import express from "express";
import { borrowBook, getBorrowedBooksSummary } from "../controllers/borrowController";

const borrowRoutes = express.Router();

borrowRoutes.post("/", borrowBook);
borrowRoutes.get("/", getBorrowedBooksSummary);

export default borrowRoutes;