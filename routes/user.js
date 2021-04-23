const express = require('express');
const router = express.Router();
/*le controleur pour associer les fonctions au differente routes */
const userCtrl = require('../controllers/user');

router.post('/singup', userCtrl.signup);
router.post('/login', userCtrl.login);


module.exports = router;