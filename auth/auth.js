import * as jwt from "jsonwebtoken";
import { auth } from "../config/authkey";
import {mysqlConnection} from '../db/connection';

function sign(user){
    return jwt.sign({
        user: user
    }, auth, { expiresIn: '24h' });
}

function decode(token){
    return jwt.decode(token, auth);
}

async function isUser(req,res, callback){
    const dec=await decode(req.headers['token-clubsue'])
    if (dec) {
        const {user}=dec;
        mysqlConnection.query(`SELECT * FROM PERSONA WHERE documento=${user?.documento}`,
            (err, rows, fields) => {
                if (err) {res.status(500).send('Ha ocurrido al validar el token')}
                else{
                    if(rows[0]?.documento){
                        callback();
                    }else{
                        res.status(401).send('Usted no está autorizado para realizar está petición');
                    }
                }
            }
        );
    } else {
        res.status(401).send('Usted no está autorizado para realizar está petición');
    }
}

async function isStudent(req,res, callback){
    const dec=await decode(req.headers['token-clubsue'])
    if (dec) {
        const {user}=dec;
        mysqlConnection.query(`SELECT * FROM PERSONA WHERE documento=${user?.documento}`,
            (err, rows, fields) => {
                if (err) {res.status(500).send('Ha ocurrido al validar el token')}
                else{
                    if(rows[0]?.rol==='estudiante'){
                        callback();
                    }else{
                        res.status(401).send('Usted no está autorizado para realizar está petición');
                    }
                }
            }
        );
    } else {
        res.status(401).send('Usted no está autorizado para realizar está petición');
    }
}

async function isInstructor(req,res, callback){
    const dec=await decode(req.headers['token-clubsue'])
    if (dec) {
        const {user}=dec;
        mysqlConnection.query(`SELECT * FROM PERSONA WHERE documento=${user?.documento}`,
            (err, rows, fields) => {
                if (err) {res.status(500).send('Ha ocurrido al validar el token')}
                else{
                    if(rows[0]?.rol==='instructor'){
                        callback();
                    }else{
                        res.status(401).send('Usted no está autorizado para realizar está petición');
                    }
                }
            }
        );
    } else {
        res.status(401).send('Usted no está autorizado para realizar está petición');
    }
}

export {sign,isUser,isStudent,isInstructor};