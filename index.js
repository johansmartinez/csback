import express from "express";
import cors from "cors";

const app=express();
const PORT= process.env.PORT || 3002;

app.use(cors());
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

app.listen(PORT, ()=>{
    console.log(`Server runnig on PORT: ${PORT}`);
});