var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// PUT user block
router.put('/users/:userId/block', async (req, res) => {
  const userId = req.params.userId;
  res.json({ message: `Usuario con Id. ${userId} bloqueado correctamente` });
});

module.exports = router;
