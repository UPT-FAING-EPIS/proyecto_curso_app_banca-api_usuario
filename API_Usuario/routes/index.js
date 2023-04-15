var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router);
  router.use('/products', productsRouter);


}

module.exports = routerApi;
