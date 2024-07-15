
import express from 'express'
import db from '../connection.js';
import authenticateToken from '../services/authentication.js';

const router = express.Router();

router.get('/details', authenticateToken, (req, res) => {
    let query = `SELECT COUNT(*) as categoryCount FROM category`;
    let categoryCount;
    let productCount;
    let billCount ;
    db.query(query, (err, results) => {
        if(err ) {
            return res.status(500).json(err);
        }
        else {
            categoryCount = results[0].categoryCount;
        }
    })

    query =  `SELECT COUNT(*) as productCount FROM product`;
    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json(err);
        }
        else {
            productCount = results[0].productCount;

        }
    })
    query = `SELECT COUNT(*) as billCount FROM bill` ;

    db.query(query, (err, results) => {
        if(err) {
            return res.status(500).json(err);
        }
        else {
            billCount = results[0].billCount;
            let data = {
                billCount,
                categoryCount,
                productCount
            }
            return res.status(200).json(data);
        }
    })

})

export default router;