const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: "https://TUO-NOME-SITO.netlify.app" // consente solo richieste dal tuo frontend su Netlify
}));
app.use(express.json()); // Spostato PRIMA delle rotte
app.use("/api", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Ciao dal backend");
});

// Start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connesso a MongoDB");
    app.listen(port, () => {
      console.log(`Server in ascolto sulla porta ${port}`);
    });
  })
  .catch((err) => console.error("Errore nella connessione a MongoDB:", err));
