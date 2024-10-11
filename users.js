// models/User.js
const mongoose = require('mongoose');

// Définir le schéma pour un utilisateur
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    default: 18
  }
}, {
  timestamps: true // Pour avoir createdAt et updatedAt automatiquement
});

// Exporter le modèle User
module.exports = mongoose.model('Users', userSchema);
