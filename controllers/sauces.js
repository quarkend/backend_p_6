const Thing = require('../models/thing');
const fs = require('fs');
const { json } = require('body-parser');
/***req.body.thing ki sera 1 cahine de caracter mais qui sera on faite un objet js sous forme 
 * de chain d caracter il faut analyser et transformer on c de c */
exports.createThing = (req, res, next) => {
    /*la methode json.parce et on lui pass req.body.thing extrair l objet json de thing*/
    const thingObject = (req.body.thing);
    // console.log(JSON.parse(req.body.thing));
    /**en eleve le id de thigObject au lieu de req.body.thing */
    // delete thingObject._id;
    const thing = new Thing({
        /*ici aussi ...req.body devient...thingObject*/
        ...thingObject,
        /* recup l urel dinamiquement req.protocol = soit http *+ le host de notre serveur (3000) +le nom du fichier/*/
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
    Thing.updateOne({ _id: req.params.id }, { ...thingObject, _id: req.params.id })
    console.log(res)
        .then(() => res.status(200).json({ message: 'Objet modifié !' }))
        .catch(error => res.status(400).json({ error }));
};
exports.deleteThing = (req, res, next) => {
    Thing.findOne({ _id: req.params.id })
        .then(thing => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Thing.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Objet supprimé !' }))
                    .catch(error => res.status(400).json({ error }));
            });
        })
        .catch(error => res.status(500).json({ error }));
};
exports.getOneThing = (req, res, next) => {
    /* req.params.id*/
    Thing.findOne({ _id: req.params.id })
        .then(thing => res.status(200).json(thing))
        .catch(error => res.status(404).json({ error }));


};
exports.getAllThings = (req, res, next) => {
    Thing.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({ error }));

};

// // LIKE & DISLIKE
// exports.likeStatus = (req, res, next) => {
//     const like = req.body.like;
//     const userId = req.body.userId;

//     // LIKE
//     if (like == 1) {
//         Thing.updateOne(
//             { _id: req.params.id },
//             {
//                 $push: { usersLiked: userId },
//                 $inc: { likes: 1 }
//             })
//             .then(() => res.status(200).json({ message: 'Like ajouté' }))
//             .catch(error => res.status(400).json({ error }));
//     };
//     // NEUTRAL
//     if (like == 0) {
//         Thing.findOne({ _id: req.params.id })
//             .then(thing => {
//                 if (thing.usersLiked.includes(req.body.userId)) {
//                     Thing.updateOne(
//                         { _id: req.params.id },
//                         {
//                             $pull: { usersLiked: userId },
//                             $inc: { likes: -1 }
//                         }
//                     )
//                         .then(() => res.status(200).json({ message: 'Like retiré' }))
//                         .catch(error => res.status(400).json({ error }));
//                 } else if (thing.usersDisliked.includes(req.body.userId)) {
//                     Thing.updateOne(
//                         { _id: req.params.id },
//                         {
//                             $pull: { usersDisliked: userId },
//                             $inc: { dislikes: -1 }
//                         }
//                     )
//                         .then(() => res.status(200).json({ message: 'Dislike retiré' }))
//                         .catch(error => res.status(400).json({ error }));
//                 };
//             })
//             .catch(error => res.status(404).json({ error }));
//     };
//     // DISLIKE
//     if (like == -1) {
//         Thing.updateOne(
//             { _id: req.params.id },
//             {
//                 $push: { usersDisliked: userId },
//                 $inc: { dislikes: 1 }
//             })
//             .then(() => res.status(200).json({ message: 'Dislike ajouté' }))
//             .catch(error => res.status(400).json({ error }));
//     }
// }