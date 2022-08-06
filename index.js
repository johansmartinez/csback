import express from "express";
import cors from "cors";

const app=express();
const PORT= process.env.PORT || 3002;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(cors({origin: '*'}))
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