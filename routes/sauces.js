const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const stuffCtrl = require('../controllers/sauces');
const multer = require('../middleware/multer-config');
router.post('/', auth, multer, stuffCtrl.createThing);
router.get('/', auth, stuffCtrl.getAllThings);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer, stuffCtrl.modifyThing);
/* delete le dernier crud de api*/
router.delete('/:id', auth, stuffCtrl.deleteThing);
router.post('/:id/like', auth, stuffCtrl.likeSauces);
module.exports = router;
