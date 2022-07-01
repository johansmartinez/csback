import {mysqlConnection} from '../db/connection';
import {nowText} from '../util';

export function getRankStudent(req, res) {
    const {documento}=req.params;
    mysqlConnection.query(`SELECT * FROM PERSONA WHERE documento='${documento}'`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar: Estudiante')
            else {
                if (rows[0]?.documento) {
                    mysqlConnection.query(`SELECT * FROM RANGOS_ACTUALES WHERE documento='${documento}'`,
                        (err, rows, fields) => {
                            if(err) res.status(500).send('Ha ocurrido un error al consultar: RANGO')
                            else res.json(rows[0]);
                        }
                    );
                } else {
                    res.status(500).send('No se encuentra registrado el estudiante')
                }
            }
        }
    );
};

export function iniatilizeRank(req,res) {
    const {documento}=req.body;
    mysqlConnection.query(`INSERT INTO RANGO (documento,cinta,fecha_obtencion) VALUES ('${documento}', 1,'${nowText()}' )`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al Iniciar: RANGO')
            else {
                mysqlConnection.query(`SELECT * FROM RANGOS_ACTUALES WHERE documento='${documento}'`,
                    async (err,rows, fields)=>{
                        if(err) res.status(500).send('Ha ocurrido un error al Iniciar: RANGO')
                        else {
                            await getReq(JSON.parse(JSON.stringify(rows[0])),res)
                        }
                    }
                )
            };
        }
    )
};

async function getReq(data,res) {
    await mysqlConnection.query(`SELECT * FROM ASCENSO_RANGO WHERE rango_id= ${data.id}`,
        (err,rows, fields)=>{
            if (err) res.status(500).send('Ha ocurrido un error al consultar los requisitos')
            else res.send(rows)
        }
    )
}