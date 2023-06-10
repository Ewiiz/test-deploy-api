const mongoose = require('mongoose')

const User = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    prenom: {
        type: String,
        // required: true,
    },
    nom: {
        type: String,
        // required: true,
    },
    pseudo: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        required: true
    },
    description: String,
}, { timestamps: true })

module.exports = mongoose.model('User', User)