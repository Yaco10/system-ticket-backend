import { createApp } from "./app";
import { connectDB } from "./config/db";
import express from "express";

async function boostrap() {
    try{
        await connectDB()

        const app = createApp()
        const port = process.env.PORT ? Number(process.env.PORT) : 3000;

        app.listen(port, () => { console.log(`Server corriendo en puerto ${port}`) })
    }   
    catch (err){ 
        console.error("❌ Error al iniciar:", err); 
        process.exit(1); 
    }
}

boostrap()