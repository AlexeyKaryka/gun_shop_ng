const express = require('express');
const router = express.Router();
const api = require('../login.api.js');

router.post('/login', function(req, res, next) {

  api.checkUser(req.body, res, req, next);

})


router.post('/register', function(req, res, next) {
  api.createUser(req.body, res, req);
})

router.post('/logout', function(req, res, next) {
  if (req.session.user) {
    console.log('logouted, session deleted');
    delete req.session.user;
    res.redirect('/');
  } else {
    console.log('logouted, session is not exist');
    res.redirect('/');
  }
});

module.exports = router;
