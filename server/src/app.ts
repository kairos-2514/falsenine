import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "server chal raha hai" });
});

app.use("/api/contact", contactRoutes);

export default app;
