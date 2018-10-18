var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) { 'use strict';
  res.render('index', { title: 'server' });
});

/*router.get('/foo', function(req, res, next) { 'use strict';
    res.send({ result: 'successful'});
}); */


module.exports = router;
