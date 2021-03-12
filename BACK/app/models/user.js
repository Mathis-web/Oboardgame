const db = require('../database');
const hashService = require('../services/passwordHandler');

class User {
    id;
    firstname;
    lastname;
    pseudo;
    email;
    password;
    phoneNumber;
    roleId;
    localisationId;

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    set phone_number(val) {
        this.phoneNumber = val;
    }

    set role_id(val) {
        this.roleId = val;
    }

    set localisation_id(val) {
        this.localisationId = val;
    }

    static async findAll() {

        const { rows } = await db.query(`SELECT * FROM "user"`);

        return rows.map(user => new User(user));
    }

    static async checkIfExist(data) {

        const query = {
            text: `SELECT id, pseudo, password FROM "user" WHERE "user".email = $1`,
            values: [data.email]
        }

        const { rows } = await db.query(query);

        if(!rows[0]) {
            throw new Error('Wrong email or password')
        }

        const match = await hashService.comparePassword(data.password, rows[0].password);
        
        if(match) {

            return new User({
                id: rows[0].id,
                pseudo: rows[0].pseudo 
            })
        } else {
            throw new Error('Wrong email or password')
        }
            
    }

    async save() {
        this.password = await hashService.hashPassword(this.password);

        const query = {
            text: `
                INSERT INTO "user" (firstname, lastname, pseudo, email, password, phone_number, localisation_id)
                VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING pseudo;
            `,
            values: [this.firstname, this.lastname, this.pseudo, this.email, this.password, this.phoneNumber, this.localisationId]
        }

        try {
            const { rows } = await db.query(query);
            if(rows[0]) {
                return rows[0];
            } 
        } catch (error) {
            switch (error.constraint) {
                case 'unique_email':
                    throw new Error('This email already exists');
                    break;
                case 'unique_pseudo':
                    throw new Error('This pseudo already exists');
                    break;
                case 'unique_phone_number':
                    throw new Error('This phone number already exists for another user');
                    break;
                default:
                    throw new Error('Inscription failed, please try again');
                    break;
            }
        }
    }

    static async delete(data) {
        const query = {
            text : `DELETE FROM "user" WHERE id = $1`,
            values : [data]
        }
            
        try {
            const { rows } = await db.query(query);
            return 'Your account has been deleted succesfully';
        }catch (error){
            throw new Error('Something went wrong, please try again');
        }
    }


}

module.exports = User;