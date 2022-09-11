const { v4: uuidv4 } = require('uuid');
const path = require('path');
const db = require(path.resolve(__dirname, '..', 'Utilities', 'sqliteDB.js'));

// make accesible the environment variables
require('dotenv').config();

const table = process.env.PERSON_TABLE;

class Person {
    constructor(id, user_name, name, surname, location, birthdate, password) {
        this.id = id;
        this.user_name = user_name;
        this.name = name;
        this.surname = surname;
        this.location = location;
        this.birthdate = birthdate;
        this.password = password;
    }

    static async getAll() {
        return await db.retrievAll(table);
    }

    static async getPersonById(id) {
        return await db.retrieveById(table, id);
    }

    static async setPerson(input) {
        const id = uuidv4();
        const person = new Person(id, input.userName, input.firstName, input.lastName, input.location, new Date(input.birthDate), input.password);
        return await db.save(table, person);
    }

}


module.exports = Person;