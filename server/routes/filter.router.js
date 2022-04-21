const { SearchOff } = require('@mui/icons-material');
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

// --- Approved Event Search Results ----------------------------------------
router.get('/approved/:search', (req, res) => {

    let search = req.params.search;

    pool.query(`
        SELECT 
            events.id,
            events.org_id,
            events.category_id,
            events.status,
            events."name",
            events.description,
            TO_CHAR(start_date, 'Mon') AS "month",
            extract(
            day from start_date
            ) AS "day",
            to_char(start_date, 'Dy') AS "dayname",
            events.start_time,
            events.end_time,
            events.image,
            events.address1,
            events.address2,
            events.city,
            events.zip,
            events.state,
            events.feedback, 
            organizations.name as "orgname"
        FROM 
            events 
        JOIN 
            organizations
        ON  
            organizations.id = events.org_id
        WHERE 
            events.status = 'approved'
        AND
            events."name" ILIKE ('%' || $1 || '%')
        ORDER BY
            events.start_date ASC;`, [search])
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('Error in GET for search APPROVED', error);
            res.sendStatus(500);
        })
});

// --- Pending Event Search Results ----------------------------------------
router.get('/pending/:search', (req, res) => {

    let search = req.params.search;

    pool.query(`
        SELECT 
            events.id,
            events.org_id,
            events.category_id,
            events.status,
            events."name",
            events.description,
            TO_CHAR(start_date, 'Mon') AS "month",
            extract(
            day from start_date
            ) AS "day",
            to_char(start_date, 'Dy') AS "dayname",
            events.start_time,
            events.end_time,
            events.image,
            events.address1,
            events.address2,
            events.city,
            events.zip,
            events.state,
            events.feedback, 
            organizations.name as "orgname"
        FROM 
            events 
        JOIN 
            organizations
        ON  
            organizations.id = events.org_id
        WHERE 
            events.status = 'pending'
        AND
            events."name" ILIKE ('%' || $1 || '%')
        ORDER BY
            events.start_date ASC;`, [search])
        .then((results) => {
            res.send(results.rows)
        })
        .catch((error) => {
            console.log('Error in GET for search PENDING', error);
            res.sendStatus(500);
        })
});

module.exports = router;