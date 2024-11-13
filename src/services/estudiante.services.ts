
// src/services/user.service.ts
import { Estudiante } from"../models/estudianteModel";

export class EstudianteService {

     async getEstudiante(){
       const  data = await Estudiante.find()
       .then(data=>{
        return data;
       })
    }

     async getEstudianteById(id:string){
       const  data = await Estudiante.findOneBy({id: Number(id)})
       .then(data=>{
        return data;
       })
    }

     async createEstudiante(estudiante:Estudiante){

       const data = await Estudiante.save(estudiante)
       return data;
       
    }

     async updateEstudiante(id:string,estudiante:Estudiante){
     
      const  data = await Estudiante.findOneBy({id: Number(id)})

        if(data?.id){
          const registro = await Estudiante.update(id,estudiante)
          .then(data=>{
            return data;
          })
        }
    }
}
