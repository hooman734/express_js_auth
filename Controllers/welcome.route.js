const router = require('express').Router();
const path = require('path');
require('dotenv').config();
const Cryptr = require('cryptr');

const cryptr = new Cryptr(process.env.SECRET_KEY);

const Person = require(path.resolve(__dirname, '..', 'Models', 'person.model.js'));

router.get('/profile/:id', (req, res, next) => {
    const id = cryptr.decrypt(req.params.id);
    Person.getPersonById(id).then(data => {
        const details = {name: data[0][0].name, surname: data[0][0].surname, location: data[0][0].location, birthdate: data[0][0].birthdate};
        res.render('profile.page.ejs', {
            details
        });
    });
});

router.get('/', (req, res, next) => {
    Person.getAll().then(data => {
        const persons = data[0].map(person => ({ name: person.user_name, id: cryptr.encrypt(person.id) }));
        res.render('welcome.page.ejs', {
            persons,
            verified: req.session.userIsAuthenticated,
        })
    });
});

module.exports = router;