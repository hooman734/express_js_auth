const path = require('path');
const db = require(path.resolve(__dirname, '..', 'Utilities', 'mysql2Connection.js'));

// make accesible the environment variables
require('dotenv').config();

const table = process.env.PERSON_TABLE;

class Person {
    constructor(id, userName, name, surname, location, birthdate, password) {
        this.id = id;
        this.userName = userName;
        this.name = name;
        this.surname = surname;
        this.location = location;
        this.birthdate = birthdate;
        this.password = password;
    }

    static getAll() {
        return db.execute(`SELECT id, user_name FROM ${table}`);
    }

    static getPersonById(id) {
        return db.execute(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    }

    static setPerson(person) {
        return db.execute(`INSERT INTO ${table} (user_name, name, surname, location, birthdate, password) VALUES (?, ?, ?, ?, ? , ?)`, [person.userName, person.firstName, person.lastName, person.location, person.birthDate, person.password]);
    }

}


module.exports = Person;