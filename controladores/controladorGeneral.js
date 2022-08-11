import { usuariosDao } from '../daos/index.js';
import {configuracion, loggerConsola} from '../log4js/log4.js';
import {puerto} from '../minimist/minimist.js'
configuracion();


const controladorGeneral = {
    getRegistro: async (req, res)=>{
      loggerConsola.info(`localhost:${puerto}/registro`);
      loggerConsola.info(`Metodo: GET`);
        res.render('inicio');
    },
    postLogin: async(req,res)=>{
      loggerConsola.info(`localhost:${puerto}/login`);
      loggerConsola.info(`Metodo: POST`);
        if(req.body.nombre){
           res.render('registrado', {nombre: req.body.nombre} ); 
           await usuariosDao.save(req.body);
         }
         else{
           res.send('Registro Fallado')
         }
    },
    getLogin: async (req,res)=>{
      loggerConsola.info(`localhost:${puerto}/login`);
      loggerConsola.info(`Metodo: GET`);
        res.render('registrado');
    },
    getLogout: async (req,res)=>{
      loggerConsola.info(`localhost:${puerto}/logout`);
      loggerConsola.info(`Metodo: GET`);
        req.session.destroy(err => {
            if (err) {
              res.json({ status: 'Logout ERROR', body: err })
            } else {
              res.render('logout')
            }
          })
    }
}

export default controladorGeneral;

