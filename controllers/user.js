const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};


// const bcrypt = require('bcrypt');

// const User = require('../models/User');
// /************** */
// const express = require('express');
// const router = express.Router();
// /****************** */
// const userCtrl = require('../controllers/user');
// /*la logique de signup*/
// exports.signup = (req, res, next) => {
//     /*hasher le mdp 10 tours d algorithm*/
//     bcrypt.hash(req.body.password, 10)
//         /*recup le hash de mdp quand va enregistrer ds 1 noveau user ...bd*/
//         .then(hash => {
//             /*cree nov user avec notre model mongoose*/
//             const user = new User({
//                 email: req.body.email,
//                 password: hash
//             });
//             user.save()
//                 .then(() => res.status(201).json({ message: 'Utilisateur creé !' }))
//                 .catch(error => res.status(400).json({ error }));


//         })
//         .catch(error => res.status(500).json({ error }));



// };

// exports.login = (req, res, next) => {
//     /*trouver le user sinon err + ojet de comparaison objet filtre */
//     User.findOne({ email: req.body.email })
//         .then(user => {
//             if (!user) {
//                 return res.status(401).json({ error: 'Utilisateur non trouvé! ' });
//             }
//             /*si on arrive ici cad on 1 user*/
//             bcrypt.compare(res.body.password, user.password)
//                 .then(valid => {
//                     if (!valid) {
//                         return res.status(401).json({ error: 'mot de passe incorrecte! ' });
//                     }
//                     res.status(200).json({
//                         userId: user._id,
//                         token: 'TOKEN'
//                     });

//                 })
//                 .catch(error => res.status(500).json({ error }));
//         })
//         /* mongoose fait un tour pour chercher email user*/
//         .catch(error => res.status(500).json({ error }));


// };