import {mysqlConnection} from '../db/connection';

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

const nowText=()=>{
    const now=new Date((Date.now()-(86400*1000)));
    return now.toISOString().split('T')[0];
}