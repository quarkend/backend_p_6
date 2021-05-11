const express = require('express');
const bodyParser = require('body-Parser');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config()
const stuffRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const helmet = require('helmet')
const app = express();
mongoose.set('useCreateIndex', true);
mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@${process.env.DBHOST}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/sauces', stuffRoutes);
/*X - XSS - Protection vulnérabilités les plus courantes*/
app.use(helmet.xssFilter());
app.use(helmet.frameguard({ action: 'deny' }));
module.exports = app;
