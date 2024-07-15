

import jwt from 'jsonwebtoken';
import dotEnv from 'dotenv';

dotEnv.config();

const checkRole = (req, res, next) => {
    if(res.locals.role === process.env.USER) {
        res.sendStatus(401);
    }
    else {
        next();
    }
}

export default checkRole;