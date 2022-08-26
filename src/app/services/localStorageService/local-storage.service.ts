import { Injectable, EventEmitter } from '@angular/core';
import {User} from './../../models/user';
import {Conversation} from './../../models/conversation'

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  usuario:any="";
  user!:User;
  conversation:any=""
  conversations:Conversation[]=[]
  userChange:EventEmitter<void>=new EventEmitter<void>();

  constructor() { }

  saveToken(token:string){
      localStorage.setItem('access_token',token);
  }

  getToken(){
      const token=localStorage.getItem('access_token');
      return token;
  }

  clearToken(){
      localStorage.removeItem("access_token");
  }

  saveUser(user:any){
      localStorage.setItem('user',JSON.stringify(user));
      this.userChange.emit();
  }

  async getUser(){
      this.usuario= localStorage.getItem('user');
      this.user= await JSON.parse(this.usuario);
      return this.user;
  }

  clearUser(){
      localStorage.removeItem("user");
      this.userChange.emit();
  }

  clearAll(){
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    this.userChange.emit();
  }

  saveConversations(conversations:Conversation[]){
    localStorage.setItem('orders',JSON.stringify(conversations));
  }

  async getConversations(){
    this.conversation=  localStorage.getItem('conversations');
    this.conversations= await JSON.parse(this.conversation);
    return this.conversations;
  }
}