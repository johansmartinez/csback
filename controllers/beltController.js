import {mysqlConnection} from '../db/connection';

export function getAllBelts(req, res) {
    mysqlConnection.query(`SELECT * FROM CINTA`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar: CINTA')
            else res.json(rows);
        }
    );
};

export function getBelt(req, res) {
    const {id}=req.params
    mysqlConnection.query(`SELECT nombre FROM CINTA WHERE id=${id}`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar: CINTA')
            else {
                if (rows[0]?.nombre) {
                    res.send(rows[0])
                }else{
                    res.status(500).send('Ha ocurrido un error al consultar: CINTA')
                }
            };
        }
    );
};