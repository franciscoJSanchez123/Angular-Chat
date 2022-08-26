import { Component, OnInit } from '@angular/core';
import {ChatService} from '../../services/chatService/chat.service';
import { LocalStorageService} from '../../services/localStorageService/local-storage.service'

import { Conversation} from './../../models/conversation'

import {User} from './../../models/user'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  roomName:string="";
  newRooms:string[]=[];
  areMyNewRoomsVisible:boolean=false;
  myRooms:any[]=[];
  iActive:number=-1;
  areMyRoomsVisible:boolean=true;
  text:string="";
  from:string="usuario1";
  messageList:any[]=[];
  conversation!:Conversation;
  conversationList:Conversation[]=[];
  user!:User;
  createRoom:boolean=false;
  isEmojiListActive:boolean=false;

  constructor(
    private chatService:ChatService,
    private localStorageService:LocalStorageService
    ) { }

/*----------------------------------------------------------------------------------------------------------------- */

  ngOnInit(): void {

    //me subscribo al observable onPrivate para escuchar los mensajes entrantes 
    //cuando llegue uno reviso conversationList para buscar el room que coincida con el
    //room del mensaje entrante y una vez que consiga el room guardo el mensaje en el
    //arreglo de ese room
    this.chatService.onPrivate().subscribe((data:any)=>{
      this.conversationList.forEach(conversation=>{
        if(conversation.name===data.room){
          conversation.messages.push(data)
          console.log(this.conversationList)
        }

        this.myRooms.forEach(room=>{                          //buscamos en el arreglo de rooms el rooms en el que estamos ubicados 
          if(room.name===data.room){                       //para añadirle el ultimo mensaje al room correspondiente
            room.lastMessage=data.message
          }
        })
      })

     
      
      console.log(data)

      
    })
    //me subscribo al observable onRoom para escuchar cuando una nueva room sea creada 
    //cuando exista una nueva room la guardo en el arreglo de rooms nuevas
    this.chatService.onRoom().subscribe((data:any)=>{
      this.newRooms.push(data)
      console.log(data)
    })

    //pido los datos del usuario 
    //me subscribo al local StoraService para que me avice cuando haya algun cambio en el usuario
    //y si se detecta un cambio entonces le pido los datos al localStoraService 
    this.getUser()
    this.localStorageService.userChange.subscribe(()=>{
      this.getUser()
    })

    
  }

/*----------------------------------------------------------------------------------------------------------------- */
//metodo para crear nueva room

  onCreate (){
    this.chatService.onCreate(this.roomName) //utiliza chatService para crear new room
    const roomData={name:this.roomName,lastMessage:""} //creamos un objeto con los datos del room
    this.myRooms.push(roomData)         //añade el room creado al arreglo de room al qe pertenece el usuario
    this.conversation={name:this.roomName,messages:[],lastMessage:""}; //guarda en conversation un objeto que contiene el nombre del room y los mensajes pertenecientes a ese room
    this.conversationList.push(this.conversation); //guarda en conversation list la conversation creada en el paso anterior
    this.createRoom=!this.createRoom;              //para restaurar la casilla de create room
    console.log(this.conversationList)
  }


/*----------------------------------------------------------------------------------------------------------------- */

  //metodo para unirse a un room especifico
  onJoin (newRoom:string){
    this.chatService.onJoin(newRoom); //utilizamos chatService para unirnos a un room
    const roomData={name:newRoom,lastMessage:""} //creamos un objeto con los datos del room
    this.myRooms.push(roomData);       //añadimos el room al que nos unimos al arreglo de rooms a los que pertenecemos 
    this.roomName=newRoom;            //guardamos en roonName el nombre del room al que nos unimos para que al enviar mensaje sea para ese room
    this.conversation={name:newRoom,messages:[],lastMessage:""}; //guarda en conversation un objeto que contiene el nombre del room al que nos unimos y los mensajes pertenecientes al room que nos unimos
    this.conversationList.push(this.conversation); //guarda en conversation list la conversation creada en el paso anterior
    console.log(this.conversationList)
    const i = this.newRooms.indexOf(newRoom );   //borra de la lista de new room el room al que nos unimos 
    if ( i !== -1 ) { 
      this.newRooms.splice( i, 1 );
  }
    
  }
/*----------------------------------------------------------------------------------------------------------------- */

  //metodo para enviar un mensaje
  onMessage(event:any){
    if(event.keyCode===13 && this.text){
    this.from=this.user.name;               //guardo en from el nombre del usuario logueado 
    const mess={room:this.roomName,message:this.text,from:this.from} //creamos objeto con todas las propiedades del mensaje

    this.conversationList.forEach(conversation=>{        //buscamos en conversation list el room al que pertenece el mensaje 
      if(conversation.name===this.roomName){             //y cuando lo consigamos añadimos el mensaje a ese room esto es para que el mensaje
        conversation.messages.push(mess)                 //le aparezca al que lo envio
        conversation.lastMessage=this.text               //guardando el ultimo mensaje
      }
    })

    this.myRooms.forEach(room=>{                          //buscamos en el arreglo de rooms el rooms en el que estamos ubicados 
      if(room.name===this.roomName){                       //para añadirle el ultimo mensaje al room correspondiente
        room.lastMessage=this.text
      }
    })
    
    this.chatService.onMessage(mess)       //utilizamos el chatService para enviar el mensaje
    event.target.value=""                  //borramos el contenido del input
    this.text=""                           //borramos el contenido de text
    }
  }

/*----------------------------------------------------------------------------------------------------------------- */

  //metodo para seleccionar el room al que quiero acceder
  onRoomSelect(room:string, i:number){
    this.conversationList.forEach(conversation=>{   //buscamos en conversation list el room al que queremos acceder
      if(conversation.name===room){                  //y cuando lo consigamos guardamos en messageList los mensajes de ese room
        this.messageList=conversation.messages       //para que sean renderizados
        this.iActive=i;                              //el index del room seleccionado lo guardamos en iActive para cambiar el color de ese div
      }
    })
    this.roomName=room                                //guardamos en roonName el room que seleccionamos para que al enviar mensaje sea para ese room
  }


/*----------------------------------------------------------------------------------------------------------------- */


  //metodo para borrar los datos del usuario del localStorage cuando le de logOut
  logout(){
    this.localStorageService.clearAll()
  }

/*----------------------------------------------------------------------------------------------------------------- */

  //metodo para solicitar los datos del usuario logueado
  async getUser(){
    this.user=await this.localStorageService.getUser()
  }



   addEmoji(event:any) {
    this.text = `${this.text}${event.emoji.native}`;
    
 }



}

/*----------------------------------------------------------------------------------------------------------------- */