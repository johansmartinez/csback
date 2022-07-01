import {mysqlConnection} from '../db/connection';
import {nowText} from '../util';

export const getReports=(req,res)=>{
    const {documento}=req.params;
    mysqlConnection.query(`SELECT * FROM INFORME WHERE rango IN (SELECT id FROM RANGO WHERE documento='${documento}')`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar: INFORMES')
            else res.json(rows);
        }
    );
};

export const addReport=(req,res)=>{
    const {documento,descripcion,instructor,requisito}=req.body;
    mysqlConnection.query(`SELECT * FROM RANGOS_ACTUALES WHERE documento='${documento}'`,
        (err, rows, fields)=>{
            if (err) {
                res.status(500).send('Ha ocurrido un error al agregar: INFORME');
            } else {
                const id_rank=rows[0]?.id;
                const cinta=rows[0]?.cinta;
                if (rows[0]?.id) {
                    mysqlConnection.query(`INSERT INTO INFORME (descripcion,instructor,requisito,rango) VALUES ('${String(descripcion).toUpperCase()}','${instructor}',${requisito},${rows[0]?.id})`,
                        (err, rows, fields)=>{
                            if (err) {
                                res.status(500).send('Ha ocurrido un error al agregar: INFORME');
                            } else {
                                mysqlConnection.query(`SELECT * FROM ASCENSO_RANGO WHERE rango_id=${rows[0]?.id}`,
                                    (err,rows,fields)=>{
                                        if (rows.length>0) {
                                            res.send({ascenso:false});
                                        } else {
                                            mysqlConnection.query(`UPDATE RANGO SET fecha_ascenso= '${nowText()}' WHERE id=${id_rank}`,
                                                (err,rows)=>{
                                                    if (err) {
                                                        res.status(500).send('Ha ocurrido un error al editar: INFORME');
                                                    } else {
                                                        if (cinta<11) {
                                                            mysqlConnection.query(`INSERT INTO RANGO (documento,cinta,fecha_obtencion) VALUES ('${documento}',${(cinta+1)},'${nowText()}')`,
                                                                (err,rows)=>{
                                                                    if (err) res.status(500).send('Error al ascender')
                                                                    else res.send({ascenso:true})
                                                                }
                                                            );
                                                        } else {
                                                            res.send({ascenso:false});
                                                        }
                                                    }
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }
                    );
                } else {
                    res.status(500).send('El estudiante no posee un rango');
                }
            }
        }
    );
};

export const evaluate=async (req,res)=>{
    const {requisitos,instructor}=req.body;
    if (requisitos.length>0) {
        const nT=nowText();
        await requisitos.map(e=>{
            mysqlConnection.query(`INSERT INTO INFORME (descripcion,instructor,requisito,rango) VALUES ('Evaluación, fecha: ${nT}', '${instructor}',${e.requisito_id},${e.rango_id} )`)
        });
        mysqlConnection.query(`SELECT * FROM ASCENSO_RANGO WHERE rango_id=${requisitos[0]?.rango_id}`,
            (err,rows)=>{
                if (err) {
                    res.status(500).send('Ha ocurrido un error al consultar: ASCENSO RANGO')
                } else {
                    if (rows?.length==0) {
                        mysqlConnection.query(`UPDATE RANGO SET fecha_ascenso= '${nowText()}' WHERE id=${requisitos[0]?.rango_id}`,
                            (err,rows)=>{
                                if (err) {
                                    res.status(500).send('Ha ocurrido un error al editar: INFORME');
                                } else {
                                    if (requisitos[0]?.cinta<11) {
                                        mysqlConnection.query(`SELECT * FROM RANGO WHERE id=${requisitos[0]?.rango_id}`,
                                            (err,rows)=>{
                                                if (err) res.status(500).send('Error al consultar: RANGO')
                                                else{
                                                    mysqlConnection.query(`INSERT INTO RANGO (documento,cinta,fecha_obtencion) VALUES ('${rows[0].documento}',${(rows[0].cinta+1)},'${nowText()}')`,
                                                        (err,rows, fields)=>{
                                                            if (err) res.status(500).send('Error al ascender')
                                                            else{
                                                                mysqlConnection.query(`SELECT * FROM ASCENSO_RANGO WHERE rango_id=${rows.insertId}`,
                                                                    (err,rows)=>{
                                                                        if (err) {
                                                                            res.status(500).send('Error al consultar: ASCENSO RANGO')
                                                                        }else{
                                                                            res.send(rows);
                                                                        }
                                                                    }
                                                                )
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    } else {
                                        res.send([]);
                                    }
                                }
                            }
                        );
                    }else{
                        res.send(rows)
                    }
                }
            }
        );
    } else {
        res.status(500).send('No se han encontrado requisitos para Evaluar');
    }
}