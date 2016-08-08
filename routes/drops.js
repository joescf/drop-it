const router = require('express').Router();
const { getAllDrops }  = require('../db/db');
const sendJSONresp = (req,res)=>res.json(res.rows)



router.route('/')
      .get(getAllDrops, sendJSONresp);

// router.get('/', getAllDrops, function(req,res) {
//   res.json('/');
// });

module.exports = router;
