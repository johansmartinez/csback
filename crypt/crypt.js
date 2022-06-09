import bcryptjs from "bcryptjs";
import { rounds } from "../config/cryptConfig";

export const encrypt=async(text)=>{
    return  await bcryptjs.hash(text, rounds);
};

export const compare=async(text, hash)=>{
    return await bcryptjs.compareSync(text,hash);
};

