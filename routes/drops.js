const router = require('express').Router();
const { getAllDrops, addDrop, deleteDrop }  = require('../db/db');
const sendJSONresp = (req,res)=>res.json(res.rows);





router.delete('/:id', deleteDrop, function(req, res) {
  res.redirect('/');
})

router.route('/')
      .get(getAllDrops, sendJSONresp);

router.post('/', addDrop, function(req, res) {
  res.redirect('/');
});


module.exports = router;
