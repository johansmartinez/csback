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

app.listen(PORT, ()=>{
    console.log(`Server runnig on PORT: ${PORT}`);
});