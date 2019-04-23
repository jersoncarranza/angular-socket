import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';
import { resolve, reject } from 'q';
import { Usuario } from '../classes/usuario';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {	
public socketStatus = false;
public usuario: Usuario = null;
	constructor(
		private socket: Socket,
	) {  
		this.cargarStorage();
		this.checkStatus();  
	}

checkStatus(){
this.socket.on('connect', () => {
console.log('Conectado al servidor');
this.socketStatus = true;
});

this.socket.on('disconnect', () => {
  console.log('Desconectado al servidor');
  this.socketStatus = false;
  });
}

//*Emite cualquier evento del cliente => servidor
  emit(evento: string, payload?: any, callback?:Function ){
    this.socket.emit(evento, payload, callback);
  }

  //Recibe un evento evento del servidor => Cliente
  listen(evento: string){
    return this.socket.fromEvent(evento);
  }

  loginWS(nombre: string){
		return new Promise((resolve,reject) =>{
		this.emit('configurar-usuario',{nombre}, (resp) =>{
		this.usuario = new Usuario(nombre);
		this.guardarStorage();	
			resolve();  
			//console.log(resp);
			}); 
		});
		
    	// this.socket.emit('configurar-usuario',{nombre}, (resp) =>{
      	//     console.log(resp);
      	// })
	  }
	  
	getUsuario(){
		return this.usuario;
	}
	  
	 guardarStorage(){
	 	localStorage.setItem('usuario', JSON.stringify(this.usuario));
	 }

	 cargarStorage(){
		 if(localStorage.getItem('usuario')){
			this.usuario = JSON.parse(localStorage.getItem('usuario'));
			this.loginWS(this.usuario.nombre);
		 }
	 }



}
