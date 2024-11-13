import app from "./app";
import { AppDataSource } from "./db/conexion";
import "reflect-metadata";

//funcion principal no asincrona para que javascript suncione
//si uso await devo usar async
async function main() {
    //evaluo los errores
    try {

        await AppDataSource.initialize();
        console.log('base de datos conectada');
        
        app.listen(6505, () => {
            console.log(`server activo`);
        })

    } catch (error) {
        if(error instanceof Error) console.log(error.message);
    }
}

//amamos la funcion principal
main();


