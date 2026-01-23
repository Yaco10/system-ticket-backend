import { createApp } from "./app";
import { connectDB } from "./config/db";
import { PORT } from "./config/env";
import express from "express";

async function boostrap() {
    try{
        await connectDB()

        const app = createApp()
        

        app.listen(PORT, () => { console.log(`Server corriendo en puerto ${PORT}`) })
    }   
    catch (err){ 
        console.error("❌ Error al iniciar:", err); 
        process.exit(1); 
    }
}

boostrap()