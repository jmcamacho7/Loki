import { Component } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import { Configuration, OpenAIApi } from "openai";
import axios from 'axios'





@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})

export class ChatComponent {

  openai: OpenAIApi;

  constructor(private http: HttpClient, private router: Router) {
    const configuracion = new Configuration({
      apiKey: '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',
    });
    this.openai = new OpenAIApi(configuracion);
  }

  async fetchStream(stream:any) {
    const reader = stream.getReader();
    let charsReceived = 0;
    const li = document.createElement("li");

    // read() returns a promise that resolves
    // when a value has been received


    const result = await reader.read().then(
      // @ts-ignore
      function processText({ done, value }) {
        // Result objects contain two properties:
        // done  - true if the stream has already given you all its data.
        // value - some data. Always undefined when done is true.
        if (done) {
          console.log("Stream complete");
          return li.innerText;
        }
        // value for fetch streams is a Uint8Array
        charsReceived += value.length;
        const chunk = value;
        console.log(`Received ${charsReceived} characters so far. Current chunk = ${chunk}`);
        li.appendChild(document.createTextNode(chunk));
        return reader.read().then(processText);
      });
    const list = result.split(",")
    // @ts-ignore
    const numList = list.map((item) => {
      return parseInt(item)
    })
    const text = String.fromCharCode(...numList);
    const response = JSON.parse(text)
    return response
  }
  async chatInteligente(params = {}) {
    const DEFAULT_PARAMS = {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: "Hello World" }],
      // max_tokens: 4096,
      temperature: 0,
      // frequency_penalty: 1.0,
      // stream: true,
    };
    const params_ = { ...DEFAULT_PARAMS, ...params };
    const result = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + String('')
      },
      body: JSON.stringify(params_)
    });
    const stream = result.body
    const output = await this.fetchStream(stream);
    console.log(output)
    this.enviarMensajeGPT(output.choices.message)
    ;
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
