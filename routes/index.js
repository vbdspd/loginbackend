var express = require('express');
var router = express.Router();

var fs = require("fs")

/* GET home page. */
router.get('/', function (req, res, next) {
  fs.readFile("../public/index", function (err, data) {
    if (err) {
      res.status(501).send("服务器出错了")
    }
    res.send(data)
  })
});



module.exports = router;
