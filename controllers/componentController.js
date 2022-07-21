import {mysqlConnection} from '../db/connection';

export const getComponents=(req,res)=>{
    mysqlConnection.query(`SELECT * FROM COMPONENTE`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar:COMPONENTE')
            else res.json(rows);
        }
    );
};
