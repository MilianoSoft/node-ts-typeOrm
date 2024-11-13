// src/services/user.service.ts
import { Profesor } from"../models/profesoresModel";

export class ProfesorService {

     async getProfesor(){
       const  data = await Profesor.find()
       .then(data=>{
        return data;
       })
    }

     async getProfesorById( id:number){
       const  data = await Profesor.findOneBy({id})
       .then(data=>{
        return data;
       })
    }
}
