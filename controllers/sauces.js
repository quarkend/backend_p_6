const Sauce = require('../models/thing');
const fs = require('fs');
const { json } = require('body-parser');
/***req.body.thing sera un objet analyser et transformer on chaine de caractere */
exports.createThing = (req, res, next) => {
    /*la methode json.parce  on lui passe req.body.thing pour extraire l objet json de thing*/
    let thingObject = JSON.parse(req.body.sauce);
    /**en enleve le id de thigObject au lieu de req.body.thing */
    delete thingObject._id;
    const thing = new Sauce({
        /*ici aussi ...req.body devient...thingObject*/
        ...thingObject,
        /* recup l url dinamiquement req.protocol = soit http *+ le host de notre serveur (3000) +le nom du fichier/*/
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};
exports.modifyThing = (req, res, next) => {
    const thingObject = req.file ?
        {
            ...JSON.parse(req.body.thing),
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};
exports.deleteThing = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
exports.getOneThing = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));
};
exports.getAllThings = (req, res, next) => {
    Sauce.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));
};
exports.likeSauces = (req, res, next) => {
    const like = req.body.like;
    if (like === 1) { // Option like
        Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId }, _id: req.params.id })
            .then(() => res.status(200).json({ message: "Vous aimez cette sauce !" }))
            .catch(error => res.status(400).json({ error }))
    } else if (like === -1) { // Option dislike
        Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId }, _id: req.params.id })
            .then(() => res.status(200).json({ message: "Vous n'aimez pas cette sauce !" }))
            .catch(error => res.status(400).json({ error }))
    } else {    // Annuler like ou dislike
        Sauce.findOne({ _id: req.params.id })
            .then(thing => {
                if (thing.usersLiked.indexOf(req.body.userId) !== -1) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId }, _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Vous n'aimez plus cette sauce !" }))
                        .catch(error => res.status(400).json({ error }))
                }
                else if (thing.usersDisliked.indexOf(req.body.userId) !== -1) {
                    Sauce.updateOne({ _id: req.params.id }, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId }, _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Vous aimez cette sauce !" }))
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }))
    }
};
