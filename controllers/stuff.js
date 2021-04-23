const Thing = require('../models/Thing')

exports.creaThing = (req, res, next) => {
    delete req.body._id;
    const thing = new Thing({

        /*sprede*/
        ...req.body

    });
    /* enregistrer ds la bd et retourne une promise then et un catch */
    Thing.save()
        .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
        .catch(error => res.status(400).json({ error }));
};
exports.modifyThing = (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => res.status(200).json({ message: 'ok objet modifier' }))
        .catch(error => res.status(400).json({ Error }));


};
exports.deleteThing = (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'ok objet suprimer' }))
        .catch(error => res.status(400).json({ Error }));


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