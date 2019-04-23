import { Component, OnInit, OnDestroy } from '@angular/core';
import {ChatService} from '../../services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  texto ='';
  mensajesSubscription: Subscription
  mensajes: any[]=[];
  elemento: HTMLElement
  constructor(
    public chatservice :ChatService
  ) { }

  ngOnInit() {
    //this.chatservice.getMessages().subscribe(msg => {
    this.elemento = document.getElementById('chat-mensajes');
    this.mensajesSubscription = this.chatservice.getMessages().subscribe(msg => {
    this.mensajes.push(msg);
    setTimeout(()=>{
        this.elemento.scrollTop = this.elemento.scrollHeight;
      })
    })
  }

  ngOnDestroy(){
    this.mensajesSubscription.unsubscribe();
  }

  enviar(){

    if(this.texto.trim().length === 0){
      return;      
    }
    this.chatservice.sendMessage( this.texto);
    this.texto='';
  }
}
