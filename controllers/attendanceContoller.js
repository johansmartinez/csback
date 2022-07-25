import {mysqlConnection} from '../db/connection';
import {nowText} from '../util';

export const getAttendance=(req,res)=>{
    const {alumno}=req.params
    mysqlConnection.query(`SELECT fecha_asistencia FROM ASISTENCIA WHERE alumno='${alumno}'`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar: ASISTENCIA');
            else res.json(rows);
        }
    );
    
};

export const getStudents=(req,res)=>{
    mysqlConnection.query(`SELECT * FROM PERSONA WHERE rol='estudiante' AND documento NOT IN (SELECT alumno FROM ASISTENCIA WHERE fecha_asistencia='${nowText()}')`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar: ASISTENCIA');
            else res.json(rows);
        }
    );
    
};

export const registerAttendance=(req,res)=>{
    const {alumno, instructor}=req.body;
    mysqlConnection.query(`INSERT INTO ASISTENCIA (alumno, instructor, fecha_asistencia) VALUES ('${alumno}', '${instructor}', '${nowText()}' )`,
        (err,rows, fileds)=>{
            if (err) res.status(500).send('Ha ocurrido un error al registrar: ASISTENCIA');
            else {
                mysqlConnection.query(`SELECT * FROM PERSONA WHERE rol='estudiante' AND documento NOT IN (SELECT alumno FROM ASISTENCIA WHERE fecha_asistencia='${nowText()}')`,
                    (err, rows, fields) => {
                        if(err) res.status(500).send('Ha ocurrido un error al consultar: ASISTENCIA');
                        else res.json(rows);
                    }
                );
            }
        }
    )
};

export const getReport=(req, res)=>{
    const {menor, mayor}= req.params;
    mysqlConnection.query(`SELECT ASI.alumno AS documento, CONCAT(PE.nombres, CONCAT(' ', PE.apellidos)) AS estudiante, COUNT(ASI.alumno) AS asistencias FROM ASISTENCIA ASI JOIN PERSONA PE ON ASI.alumno=PE.documento WHERE fecha_asistencia >= '${menor}' AND fecha_asistencia <= '${mayor}' GROUP BY ASI.alumno `,
        (err,rows, fileds)=>{
            if(err) res.status(500).send('Ha ocurrido un error al consultar: REPORTE DE  ASISTENCIAS');
            else res.json(rows);
        }
    );
};