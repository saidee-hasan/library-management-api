import express, { Application, Request, Response } from "express";
import cors from "cors";
import bookRoutes from "./routes/book.route";
import borrowRoutes from "./routes/borrow.route";

const app: Application = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Library Management API is running");
});

export default app;
