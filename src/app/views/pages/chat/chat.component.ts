import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import { Configuration, OpenAIApi } from "openai";
import {filter, from, map} from "rxjs";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {



  constructor(private http: HttpClient, private router: Router) {}

  async chatInteligente (text:any){
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + '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'
      },
      method: 'POST',
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a very funny comedian',
          },
          {
            role: 'user',
            content: 'Tell me a joke',
          },
        ],
      }),
    })
    console.log(response)
  }



  listaUsuarios: any;
  conversacion: any;

  idConver: any;

  mensaje={
    'usuarioIdEmisor': '',
    'usuarioIdReceptor': '',
    'texto': '',
    'foto':''
  }

  gptMensaje: any;



  ngOnInit() {
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})

    this.http.get("http://localhost:8000/api/chat/listachatsUsuario", {headers})
      .subscribe(
        resultado => {
          // @ts-ignore

          this.listaUsuarios = resultado;
          console.log(this.listaUsuarios);
        }
      );
  }

  abrirChat(id:any){
    const todoschat:any = document.getElementById('todoschat');
    const chat:any = document.getElementById('chat');

    localStorage.setItem('usuarioChat', id)

    const params = new HttpParams().set('usuario_id', id)
    this.idConver = id;

    const token: string | null = localStorage.getItem('token')
    const headers = new HttpHeaders({'apikey': token!})

    this.http.get("/api/chat/chatUsuarioUsuario", {headers, params})
      .subscribe(
        resultado => {
          // @ts-ignore
          this.conversacion = resultado.sort((a: any, b: any) => {
            let fechaA = new Date(a.fecha).getTime();
            let fechaB = new Date(b.fecha).getTime();
            return fechaA - fechaB;
          });;
          console.log(this.conversacion)
        }
      );

    todoschat.style.display = 'none';
    chat.style.display = 'block';
  }

  refreshPage() {
    location.reload();
  }


  cerrarChat(){
    const todoschat:any = document.getElementById('todoschat');
    const chat:any = document.getElementById('chat');
    todoschat.style.display = 'block';
    chat.style.display = 'none';
  }

  enviarMensaje(){
    const idUsuario: number | null = parseInt(localStorage.getItem('usuarioChat')!)
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})
    const body = JSON.stringify({
      'usuarioIdEmisor':1,
      'usuarioIdReceptor': localStorage.getItem('usuarioChat'),
      'texto':this.mensaje.texto,
      'foto':''})
    console.log(body)
    this.http.post('http://localhost:8000/api/chat/enviarMensaje', body, {headers: headers})
      // @ts-ignore
      .subscribe(() => {
        if (idUsuario === 10) {
          this.chatInteligente(this.mensaje.texto)
        }
        else{
          this.refreshPage()
          this.mensaje.texto = ''
        }
      });

  }
  enviarMensajeGPT(text:any){
    const token: string | null = localStorage.getItem('token')
    console.log(token)
    const headers = new HttpHeaders({'apikey': token!})
    const body = JSON.stringify({
      'usuarioIdEmisor':10,
      'usuarioIdReceptor': 1,
      'texto':text,
      'foto':''})
    console.log(body)
    this.http.post('http://localhost:8000/api/chat/enviarMensajeChatGPT', body, {headers: headers})
      // @ts-ignore
      .subscribe(() => {

        this.mensaje.texto = ''
      });
  }

}
