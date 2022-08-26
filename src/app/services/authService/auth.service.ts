import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {User} from './../../models/user';
import { UserAuth } from '../../models/userAuth';
import { Observable } from 'rxjs';
import { LocalStorageService} from './../localStorageService/local-storage.service';




const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /*user:User[]=[];*/
  userAuth:EventEmitter<any>=new EventEmitter<any>();
  constructor(
    private http:HttpClient,
    private localStorageService:LocalStorageService
    ) { }


  create(user:User): Observable<User>{
    console.log("aqui auth services")
    return this.http.post<User>('http://localhost:3000/users',user);
  }

  findAll():Observable<User[]>{
    return this.http.get<User[]>("http://localhost:3000/users");
  }

  signin(userAuth:UserAuth): Observable<any>{
    return this.http.post("http://localhost:3000/auth/login",userAuth)
  }

  profile() {
    this.setToken();
    this.http.get("http://localhost:3000/auth/profile", httpOptions).subscribe(data=>{

      this.localStorageService.saveUser(data);
      console.log(data)
      this.userAuth.emit(data);
    });
    
  }

  setToken(){
    const token=this.localStorageService.getToken()
    httpOptions.headers=httpOptions.headers.set('Authorization' , 'Bearer '+token)
  }
}