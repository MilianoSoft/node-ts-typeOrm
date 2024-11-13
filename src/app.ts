import  express, { Request, Response }  from "express";
import cors from "cors";
import morgan from "morgan";

//importo los rutas
import cursosRouter from"./routes/cursosRoutes";
import estudiantesRouter from"./routes/estudiantesRoutes";
import profesoresRouter from"./routes/profesoresRoutes";


//instanseo la app
const app = express();
//empieza a usar los middeleware
app.use(cors()); //para aceptar peticiones desde una ruta espesifica
app.use(morgan('dev')); //para loguearnos 
app.use(express.json());
//testeo de la api

app.get('/',(req:Request,res:Response)=>{
   
    res.send('hola mundo');
})

app.use("/cursos",cursosRouter);
app.use("/profesores",profesoresRouter);
app.use("/estudiantes",estudiantesRouter);

export default app;