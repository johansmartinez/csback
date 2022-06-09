import * as jwt from "jsonwebtoken";
import { auth } from "../config/authkey";
import {mysqlConnection} from '../db/connection';

function sign(user){
    return jwt.sign({
        user: user
    }, auth, { expiresIn: '24h' });
}

function decode(token){
    return jwt.verify(token, auth);
}


async function isStudent(req,res){
    let {user}=await decode(req.headers['token-clubsue'])
    mysqlConnection.query(`SELECT * FROM PERSONAS WHERE documento=${user.documento}`,
        (err, rows, fields) => {
            if (err) res.status(500).send('Ha ocurrido al validar el token');
            else{
                if(rows[0].documento){
                    if (rows[0].rol==='estudiante') {
                        
                    }
                }
            }
        }
    );
}
export {sign};