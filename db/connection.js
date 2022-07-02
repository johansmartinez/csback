import mysql from "mysql";
import { key } from "../config/dbkey";


const mysqlConnection = mysql.createConnection(key);

mysqlConnection.connect(function(err){
    if (err) {
        console.log(err);
        return;
    }else {
        console.log('la base de datos  esta conectada');
    }
});

setInterval(() => {
    mysqlConnection.ping();
}, 5000);

export {mysqlConnection};