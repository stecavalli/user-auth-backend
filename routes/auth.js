const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /api/register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: "Nome utente già esistente." });
    }

    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "Registrazione riuscita!" });
  } catch (err) {
    res.status(500).json({ message: "Errore nel server." });
  }
});

// POST /api/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (!user) {
      return res.status(401).json({ message: "Credenziali non valide." });
    }

    res.status(200).json({ message: "Login riuscito", user });
  } catch (err) {
    res.status(500).json({ message: "Errore nel server." });
  }
});

// GET /api/users
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); // Trova tutti gli utenti
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Errore nel recupero degli utenti." });
  }
});

// DELETE /api/users/:username
router.delete("/users/:username", async (req, res) => {
  const { username } = req.params;

  try {
    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) {
      return res.status(404).json({ message: "Utente non trovato." });
    }
    res.status(200).json({ message: "Utente eliminato." });
  } catch (err) {
    res.status(500).json({ message: "Errore durante l'eliminazione dell'utente." });
  }
});



module.exports = router;
