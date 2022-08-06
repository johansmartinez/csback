import express from "express";
import cors from "cors";

const app=express();
const PORT= process.env.PORT || 3002;

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "*", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}

app.use(cors(
    config.application.cors.server
));

app.use(express.json());

import eps from './routes/eps';
app.use('/eps',eps);

import person from './routes/person';
app.use('/person',person)

import attendance from './routes/attendance';
app.use('/attendance', attendance);

import belt from './routes/belt';
app.use('/belt',belt);

import rank from './routes/rank';
app.use('/rank',rank);

import report from './routes/report';
app.use('/report', report);

import component from './routes/component';
app.use('/component', component);

import requirement from './routes/requirement';
app.use('/requirement',requirement);

app.listen(PORT, ()=>{
    console.log(`Server runnig on PORT: ${PORT}`);
});