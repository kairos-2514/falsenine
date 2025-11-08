import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes";
import authRoutes from "./routes/authRoutes";
import addressRoutes from "./routes/addressRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "server chal raha hai" });
});

app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/products", productRoutes);

export default app;
