import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/passwordManager", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Schema
const passwordSchema = new mongoose.Schema({
  URL: String,
  username: String,
  password: String,
});

// Model
const Password = mongoose.model("Password", passwordSchema);

// Routes

// Get all passwords
app.get("/", async (req, res) => {
  try {
    const passwords = await Password.find();
    res.json(passwords);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add new password
app.post("/", async (req, res) => {
  try {
    const newPassword = new Password(req.body);
    await newPassword.save();
    res.json(newPassword);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update password
app.put("/:id", async (req, res) => {
  try {
    const updated = await Password.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete password
app.delete("/:id", async (req, res) => {
  try {
    await Password.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(4000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
