const User = require('../models/users.models')
const bcrypt = require('bcrypt')

exports.getAllUser = async (req, res) => {
    const allUser = await User.find()

    if (allUser.length === 0) {
        return res.status(400).json({ message: 'Il n\' y a pas d\'utilisateur dans la base. ' })
    }
    res.status(200).json({ message: 'Voici touts les utilisateurs.', allUser })
}

exports.getOneUser = async (req, res) => {
    try {
        const oneUser = await User.findOne({ _id: req.params.id })

        if (!oneUser) {
            return res.status(400).json({ message: 'Cet utilisateur n\'existe pas.' })
        }
        res.status(200).json({ message: `Voici l'utilisateur avec le nom: ${oneUser.name}.`, oneUser })
    }
    catch (err) {
        res.status(500).json({ message: `Erreur: ${err.message}` })
    }
}

exports.signUp = async (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then((passHash) => {
            const user = new User({
                email: req.body.email,
                prenom: req.body.prenom,
                nom: req.body.nom,
                pseudo: req.body.pseudo,
                password: passHash,
                description: req.body.description,
            })
            user
                .save()
                .then(() => res.status(201).json({ message: `L'utilisateur ${user.prenom} à bien été créer.` }))
                .catch((err) => res.status(400).json({ message: `Erreur: ${err.message}` }))
        }).catch((err) => {
            res.status(500).json({ message: `Erreur: ${err.message}` })
        })
}

exports.login = async (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({ message: 'Email ou Mot de passe Incorrect.' })
            }
            bcrypt.compare(req.body.password, user.password)
                .then((validation) => {
                    if (!validation) {
                        return res.status(401).json({ message: 'Mot de passe incorrect.' })
                    }
                    res.status(200).json({ userId: user._id, token: 'Voici votre token' })
                })
                .catch((err) => {
                    res.status(500).json({ message: `Erreur: ${err.message}` })
                })
        })
        .catch((err) => {
            res.status(500).json({ message: `Erreur: ${err.message}` })
        })
}


exports.putOneUser = async (req, res) => {
    try {
        const userModified = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if (!userModified) {
            res.status(404).json({ message: 'Cet utilisateur n\'existe pas.' })
        }
        res.status(200).json({ message: 'Modification enregistré.' })
    }
    catch (err) {
        res.status(500).json({ message: `Erreur: ${err.message}` })
    }
}

exports.deleteOneUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)

        if (!deleteUser) {
            return res.status(404).json({ message: 'Utilisateur introuvable.' })
        }
        res.status(200).json({ message: `Le compte avec le mail: ${deleteUser.email} à bien été supprimé.` })
    }
    catch (err) {
        res.status(500).json({ message: `Erreur: ${err.message}` })
    }
}