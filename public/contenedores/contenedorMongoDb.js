import pkg from 'mongoose';
const { model } = pkg;
import mongoose from 'mongoose';
import config from '../../config.js';
import {configuracion, loggerError} from '../../log4js/log4.js';
configuracion();

await mongoose.connect(config.mongodb.cnxStr, config.mongodb.options)



class contenedorMongoDb{
    constructor(nombreColeccion, esquema) {
        this.coleccion = mongoose.model(nombreColeccion, esquema)
    }

    async save(objeto){
            try {
                const user = {nombre: objeto.nombre, contraseña: objeto.contraseña};
                const userSaveModel = new this.coleccion(user);
                let userSave = await userSaveModel.save();
                console.log(userSave);
            } catch (error) {
                loggerError.error(`Error de lectura: ${err}`);
            }
        
    }

    async getAll(){
        try{
                let usuarios = await this.coleccion.find({});
                return usuarios;
        }
        catch(err){
            loggerError.error(`Error de lectura: ${err}`);
        }
    }

}

export default contenedorMongoDb;