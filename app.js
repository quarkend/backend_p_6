const express = require('express');
const bodyParser = require('body-Parser');
const mongoose = require('mongoose');
const Thing = require('./models/thing');
const stuffRoutes = require('./routes/stuff');

const router = express.Router();

const userRoutes = require('./routes/user');

const app = express();
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://sopeckoko:pofonor@cluster0.6b4ux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

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

/*/api/auth laracine lier a l authentification*/
app.use('/api/auth', userRoutes);
app.use('/api/stuff', stuffRoutes);
module.exports = app;


// app.use('/api/stuff', (req, res, next) => {
//     const stuff = [
//         {
//             _id: 'oeihfzeoi',
//             title: 'Mon premier objet',
//             description: 'Les infos de mon premier objet',
//             imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//             price: 4900,
//             userId: 'qsomihvqios',
//         },
//         {
//             _id: 'oeihfzeomoihi',
//             title: 'Mon deuxième objet',
//             description: 'Les infos de mon deuxième objet',
//             imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
//             price: 2900,
//             userId: 'qsomihvqios',
//         },
//     ];
//     res.status(200).json(stuff);
// });


// /*importer express*/
// const express = require('express');
// const bodyParser = require('body-Parser');
// const mongoose = require('mongoose');
// // const thing = require('./models/thing');
// const stuffRoutes = require('.routes/stuff');
// const userRoutes = require('./routes/user');
// /* creer application app juste appler la methode express qui permer de creer une app express*/
// const app = express();
// mongoose.connect('mongodb+srv://sopeckoko:pofonor@cluster0.6b4ux.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',

//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => console.log('Connexion à MongoDB réussie !'))
//     .catch(() => console.log('Connexion à MongoDB échouée !'));

// /*le 1 midel ware generale (tt l mon)a tt les req  executer par le serve on ajoute des header sur l objet reponse*/
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

// app.use(bodyParser.json());

// app.use('/api/stuff, stuffRoutes');
// /*ajoute un app.use pour enregistrer*/
// /*et laroute atendu par le frontend */
// /*/api/auth laracine lier a l authentification*/
// app.use('/api/auth', userRoutes);


// module.exports = app;


// // app.use((req, res, next) => {
// //     console.log('req recus!')
// //     /*il faut renvyer next si non la req ne se termine pas ca freez*/
// //     next();
// // })
// // /* 2em midlw*/
// // app.use((req, res, next) => {
// //     res.status(201);
// //     next();
// // })


// // /* 1 midelware et 1 fonct ds 1 app qui recoit la req et la res qi les gere et
// //   ki peuve passer execution a 1 prochun midelware une prochaine fonct (fonct next) ki permet de
// //    renvoyer a la  prochaine fonct l execution du server*/
// // app.use((req, res, next) => {
// //     res.json({ message: 'votre requete a bien ete recus!' });
// //     next();

// // });
// // app.use((req, res, next) => {
// //     console.log('reponse envoyer avec succes');
// // });
// /*exporter cet const (app) pour quand puisse acceder depuit les autre fichier de
//  notre projet notament notre server node */
