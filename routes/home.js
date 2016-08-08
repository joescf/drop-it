const router = require('express').Router();
const { getAllDrops, addDrop }  = require('../db/db');


router.get('/', function(req,res) {
  res.render('index');
});
router.post('/drops', addDrop, function(req, res) {
  res.redirect('/');
});

module.exports = router;
