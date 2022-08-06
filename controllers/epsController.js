import {mysqlConnection} from '../db/connection';

export const getEPS=(req,res)=>{
    mysqlConnection.query(`SELECT * FROM EPS`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar:EPS')
            else res.json(rows);
        }
    );
};

export const createEPS=(req,res)=>{
    const {nombre}=req.body;
    mysqlConnection.query(`INSERT INTO EPS (nombre) VALUES ('${String(nombre).toUpperCase()}')`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al registrar:EPS')
            else res.json(rows.insertId);
        }
    );
};