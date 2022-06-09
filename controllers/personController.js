import {mysqlConnection} from '../db/connection';
import {encrypt,compare} from '../crypt/crypt';
import { sign } from '../auth/auth';

export const getPerson=(req,res)=>{
    const {documento}=req.params
    mysqlConnection.query(`SELECT * FROM DATOS_PERSONA where documento='${documento}'`,
        (err, rows, fields) => {
            if(err) res.status(500).send('Ha ocurrido un error al consultar:EPS')
            else res.json(rows[0]);
        }
    );
};

export const createStudent=(req,res)=>{
    const {documento,eps,contacto,nombres,apellidos,telefono,fecha_nacimiento,correo,contrasena}=req.body;
    mysqlConnection.query(`INSERT INTO PERSONA (documento,eps,contacto,nombres,apellidos,telefono,fecha_nacimiento,fecha_inscripcion,rol) VALUES ('${documento}',${eps},NULL,'${String(nombres).toUpperCase()}','${String(apellidos).toUpperCase()}','${telefono}','${fecha_nacimiento}','${new Date().toISOString().split('T')[0]}', 'estudiante')`,
        async (err, rows, fields) => {
            if(err) {res.status(500).send('Error al registrar: Estudiante')}
            else{
                mysqlConnection.query(`INSERT INTO USUARIOS (documento,correo,contrasena) VALUES ('${documento}','${correo}','${await encrypt(contrasena)}')`,
                    (err,rows,fields)=>{
                        if (err) {res.status(500).send('Error al registrar: USUARIO')}
                        else{
                            res.status(200).send('Estudiante agregado correctamente')
                        }
                    }
                );
            }
        }
    );
};

export const createInstructor=(req,res)=>{
    const {documento,eps,contacto,nombres,apellidos,telefono,fecha_nacimiento,correo,contrasena}=req.body;
    mysqlConnection.query(`INSERT INTO PERSONA (documento,eps,contacto,nombres,apellidos,telefono,fecha_nacimiento,fecha_inscripcion,rol) VALUES ('${documento}',${eps},NULL,'${String(nombres).toUpperCase()}','${String(apellidos).toUpperCase()}','${telefono}','${fecha_nacimiento}','${new Date().toISOString().split('T')[0]}', 'instructor')`,
        async (err, rows, fields) => {
            if(err) {res.status(500).send('Error al registrar: Instructor')}
            else{
                mysqlConnection.query(`INSERT INTO USUARIOS (documento,correo,contrasena) VALUES ('${documento}','${correo}','${await encrypt(contrasena)}')`,
                    (err,rows,fields)=>{
                        if (err) {res.status(500).send('Error al registrar: USUARIO')}
                        else{
                            res.status(200).send('Estudiante agregado correctamente')
                        }
                    }
                );
            }
        }
    );
};

export const login=(req,res)=>{
    const {documento,contrasena}=req.body;
    mysqlConnection.query(`SELECT * FROM DATOS_PERSONA where documento='${documento}'`,
        async (err,rows,fields)=>{
            if (rows[0]?.documento) {
                if (await compare(contrasena,rows[0].contrasena)) {
                    const token=sign(rows[0])
                    rows[0].token=token;
                    res.json(rows[0]);
                } else {
                    res.status(400).send('La constraseña es incorrecta');
                }
            }else{
                res.status(400).send('El documento no se encuentra registrado');
            }
        }
    );
};