const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const routerUser = require('./routes/user.routes')

app.use(express.json())

// MIDDLEWARE

const logger = require('./middlewares/infosRequetes')
const bodyParser = require('./middlewares/parseurDonnes')
app.use(bodyParser.json())
app.use(logger)
app.use(cors())

require('dotenv').config()

const corsOptions = {
    origin: ['https://server-p9xqcgnrv-ewiiz.vercel.app/'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}

app.use(cors(corsOptions));

mongoose
    .connect(process.env.MONGO_CONNEXION, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connexion à la BDD réussie.')
    })
    .catch((err) => {
        console.log(`Erreur: ${err.message}`)
    })

app.use('/api', routerUser)

module.exports = app