/***************************************** */
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/stuff');

/* la route ou le n point sur notre api*/
router.get('/', stuffCtrl.getAllThings);
router.post('/', stuffCtrl.creaThing);

router.get('/:id', stuffCtrl.getOneThing);
/* UNE ROUTE PUT pour modifier une saucve ds la base de donnee(le prem arg _id objet de comparaison 
    le 2 arg cest la nouvelle version de l objet utilise le spride oppertar... , corespond*/
router.put('/:id', stuffCtrl.modifyThing);


/* delete le dernier crud de api*/
router.delete('/:id', stuffCtrl.deleteThing);



module.exports = router;