import {mysqlConnection} from '../db/connection';

export const createRequirement=(req,res)=>{
    const {requisito,componente,cinta,menores,normal}=req.body
    mysqlConnection.query(`INSERT INTO POOMSE(menores,normal) VALUES('${menores}','${normal}')`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al Agregar:Poomse')
            else {
                const poomseid=rows.insertId
                mysqlConnection.query(`INSERT INTO REQUISITO_CINTA (requisito,poomse,componente,cinta) VALUES('${requisito}', ${poomseid}, ${componente}, ${cinta})`,
                    (err, rows, fields)=>{
                        if (err) res.status(500).send('Ha ocurrido un error al Agregar:Poomse')
                        else res.status(200).send({})
                    }
                )
            }
        }
    );
};
