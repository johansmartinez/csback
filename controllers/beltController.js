import {mysqlConnection} from '../db/connection';

export function getAllBelts(req, res) {
    mysqlConnection.query(`SELECT * FROM CINTAS`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar: CINTA')
            else res.json(rows);
        }
    );
};