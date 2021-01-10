var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(['note1', 'note2']);
});

module.exports = router;
