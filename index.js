// index.js
const express = require('express');
const mongoose = require('mongoose');

const User = require('./models/users'); // Importer le modèle User
const app = express();


// Middleware pour parser le JSON
app.use(express.json());




mongoose.connect('mongodb+srv://amadoubentediallo220:amadou0000@cluster0.y8hja.mongodb.net/')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// GET : Récupérer tous les utilisateurs
app.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Récupérer tous les utilisateurs
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// POST : Ajouter un nouvel utilisateur
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body); // Créer un nouvel utilisateur à partir des données de la requête
    await newUser.save(); // Sauvegarder dans la base de données
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
});

// PUT : Mettre à jour un utilisateur par ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true, // Renvoie le document mis à jour
      runValidators: true // Valide les données avant de les mettre à jour
    });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: 'Error updating user', error });
  }
});

// DELETE : Supprimer un utilisateur par ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted', deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
});


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

