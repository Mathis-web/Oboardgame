const db = require('../database');
const User = require('./user');
const Category = require('./category');
const Localisation = require('./localisation');
const { concat } = require('../schemas/userSchema');

class Advert {
    id;
    title;
    description;
    publicationDate;
    locationPrice;
    advertImage;
    advertTitle;
    advertAuthor;
    advertReleaseYear;
    advertAvgDuration;
    advertMinPlayers;
    advertMaxPlayers;
    advertSuggestedAge;
    userId;
    gameId;

    set publication_date(val) {
        this.publicationDate = val;
    }

    set location_price(val) {
        this.locationPrice = val;
    }

    set advert_image(val) {
        this.advertImage = val;
    }

    set game_title(val) {
        this.advertTitle = val;
    }

    set game_author(val) {
        this.advertAuthor = val;
    }

    set game_release_year(val) {
        this.advertReleaseYear = val;
    }

    set game_avg_duration(val) {
        this.advertAvgDuration = val;
    }

    set game_min_players(val){
        this.advertMinPlayers = val;
    }

    set game_max_players(val) {
        this.advertMaxPlayers = val;
    }

    set game_suggested_age(val) {
        this.advertSuggestedAge = val;
    }

    set user_id(val) {
        this.userId = val;
    }

    set game_id(val) {
        this.advertId = val;
    }

    constructor(data) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async findFilteredAdverts(queryString) {

        let text;
        const values = [queryString.text]
        
        text = `
            SELECT DISTINCT ON (advert.id) advert.id AS advertId, advert.* FROM advert
            JOIN advert_has_category ON advert_has_category.advert_id = advert.id
            JOIN localisation ON localisation.id = advert.localisation_id
            WHERE advert.title ILIKE '%' || $1 || '%'
                OR advert.description ILIKE '%' || $1 || '%' 
                OR advert.game_title ILIKE '%' || $1 || '%'
        `;

        // if(queryString.categoriesId) {
        //     const categoriesNumber = queryString.categoriesId.split(',').map(category => parseInt(category, 10));
        //     console.log(categoriesNumber)
        //     values.push(queryString.categoriesId);
        //     text += 'AND advert_has_category.category_id IN ($2)';
        // }

        // if(queryString.localisationId) {
        //     values.push(parseInt(queryString.localisationId, 10));
        //     text += `AND localisation.department = (
        //         SELECT department FROM localisation WHERE localisation.id = $${values.length}
        //     )`
        // }

        const { rows } = await db.query(text, values);
        return rows
    }

    static async findOne(id) {
        const query = {
            text: 
            `
                SELECT 
                    advert.*, advert.id advert_id, "user".email, "user".pseudo, "user".phone_number, category.*, localisation.*
                FROM advert
                JOIN "user" ON advert.user_id = "user".id
                JOIN advert_has_category ON advert_has_category.advert_id = $1
                JOIN category ON advert_has_category.category_id = category.id
                JOIN localisation ON "user".localisation_id = localisation.id
                WHERE advert.id = $1
            `,
        
            values: [id]
        }
        const { rows } = await db.query(query);

        if(rows[0]) {
    
            // this object is used to organise the data we receive from the database 
            const data = {
                user: new User({
                    pseudo: rows[0].pseudo,
                    email: rows[0].email,
                    phone_number: rows[0].phone_number
                }),
                advert: new Advert({
                    id: rows[0].advert_id,
                    title: rows[0].title,
                    description: rows[0].description,
                    publication_date: rows[0].publication_date,
                    location_price: rows[0].location_price,
                    advert_image: rows[0].advert_image,
                    game_title: rows[0].game_title,
                    game_author: rows[0].game_author,
                    game_release_year: rows[0].game_release_year,
                    game_avg_duration: rows[0].game_avg_duration,
                    game_min_players: rows[0].game_min_players,
                    game_max_players: rows[0].game_max_players,
                    game_suggested_age: rows[0].game_suggested_age,
                }),
                category: [],
                localisation: new Localisation({
                    city: rows[0].city,
                    postal_code: rows[0].postal_code,
                    department: rows[0].department,
                })
            }

            rows.forEach(advert => {
                const category = {
                    name: advert.name,
                    color: advert.color
                }
                data.category.push(new Category(category))
            })
            return data; 
        } else {
            throw new Error('No such advert');
        }
    }
}

module.exports = Advert;