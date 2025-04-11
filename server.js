const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use("/api", authRoutes);
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Ciao dal backend 👋");
});

// Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connesso a MongoDB");
    app.listen(port, () => {
      console.log(`🚀 Server in ascolto su http://localhost:${port}`);
    });
  })
  .catch((err) => console.error("Errore nella connessione a MongoDB:", err));
