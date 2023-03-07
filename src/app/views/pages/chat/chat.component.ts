import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import { Configuration, OpenAIApi } from "openai";





@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {

  openai: OpenAIApi;

  constructor(private http: HttpClient, private router: Router) {
    const configuracion = new Configuration({
      apiKey: '',
    });
    this.openai = new OpenAIApi(configuracion);
  }

  async chatInteligente(texto: any) {
    const completion = await this.openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: texto }],
    });

    console.log(completion)
    // @ts-ignore
   const respuesta = completion.choices.message.content;
   this.enviarMensajeGPT(respuesta)
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
        this.refreshPage()
        this.mensaje.texto = ''
      });
  }

}
