const router = require('express').Router();
const path = require('path');
require('dotenv').config();

const Person = require(path.resolve(__dirname, '..', 'Models', 'person.model.js'));

router.get('/signup', (req, res, next) => {
    res.render('signup.page.ejs');
});

router.post('/signup', (req, res, next) => {
    Person.setPerson(req.body).then(() => {
        res.redirect('/');
    });
});

router.get('/login', (req, res, next) => {
    res.render('signedIn.page.ejs');
});

router.post('/login', (req, res, next) => {
    req.session.userIsAuthenticated = true;
    res.redirect('/');
});

module.exports = router;