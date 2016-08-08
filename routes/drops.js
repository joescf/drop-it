const router = require('express').Router();
const { getAllDrops, addDrop }  = require('../db/db');
const sendJSONresp = (req,res)=>res.json(res.rows);



// router.route('/new', addDrop)


router.route('/')
      .get(getAllDrops, sendJSONresp);


module.exports = router;
