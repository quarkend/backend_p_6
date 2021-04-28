/***********changement de stuff par sauces*********************** */

const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, stuffCtrl.createThing);
/* la route ou le n point sur notre api*/
router.get('/', auth, stuffCtrl.getAllThings);
router.get('/:id', auth, stuffCtrl.getOneThing);

/* UNE ROUTE PUT pour modifier une saucve ds la base de donnee(le prem arg _id objet de comparaison 
    le 2 arg cest la nouvelle version de l objet utilise le spride oppertar... , corespond*/
router.put('/:id', auth, multer, stuffCtrl.modifyThing);


/* delete le dernier crud de api*/
router.delete('/:id', auth, stuffCtrl.deleteThing);



module.exports = router;