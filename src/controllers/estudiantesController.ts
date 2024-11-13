import { Request, Response } from 'express';
import { Estudiante } from '../models/estudianteModel';


//creo la clase estudiante
class EstudiantesController {
  //toda clase tiene un constructor
  constructor() { }

  //los metodo que tendra la clase estudiantes son
  async consultar(req: Request, res: Response) {
    //manejo de errores
    try {
      const data = await Estudiante.find();
      if (data.length == 0) {
        throw new Error("estudiante no encontrado");
      }
      res.status(200).json(data);

    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }
  }

  //metodo de insertar estudiantes 
  async ingresar(req: Request, res: Response) {
    try {
        const registro = await Estudiante.save(req.body);
        res.status(201).json(registro);
    } catch (err) {
        if (err instanceof Error)
            res.status(500).send(err.message);
    }
}

  //metodo para actualizar estudiantes
  async actualizar(req: Request, res: Response) {

    const { id } = req.params;
    try {

      const registro = await Estudiante.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("estudiante no encontrado");
      } else {

        await Estudiante.update({id:Number(id)}, req.body)
        const updateData = await Estudiante.findOneBy({ id: Number(id) });
        res.status(200).json(updateData);
      }

    } catch (error) {
      if (error instanceof Error)
        res.status(500).send(error.message);
    }

  }

  //metodo para borrar el estudiante
  async borrar(req: Request, res: Response) {
    //manejo de errores
    const { id } = req.params;
    try {
      const registro = await Estudiante.findOneBy({ id: Number(id) });
      if (!registro) {
        throw new Error("estudiante no encontrado");
      } else {

        await Estudiante.delete({id:Number(id)})
        res.status(200).json({message:"delete student"});
      }
     } catch (error) {
        if (error instanceof Error)
          res.status(500).send(error.message);
      }
    }

//metodo para consultar detalles 
    async consultarDetalles(req: Request, res: Response){
      //manejo de errores
      const { id } = req.params;
      try {

        const registro = await Estudiante.findOneBy({ id: Number(id) });
        if (!registro) {
          throw new Error("estudiante no encontrado");
        }
        res.status(200).json(registro);

      } catch (error) {
        if (error instanceof Error)
          res.status(500).send(error.message);
      }
    }

  }

//importamos una instancia de la clase
export default new EstudiantesController();
