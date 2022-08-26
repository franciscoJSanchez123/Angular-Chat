import { Component, OnInit } from '@angular/core';
import {UserAuth} from './../../models/userAuth';
import {AuthService} from './../../services/authService/auth.service';
import {LocalStorageService} from './../../services/localStorageService/local-storage.service'
import {Router} from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  sidebar:boolean=false;
  userAuth:UserAuth={
    username:"",
    password:""
  }
  user!:User;
  
  constructor(
    private authService:AuthService,
    private localStorageService:LocalStorageService,
    private router:Router
    ) { }

  ngOnInit(): void {
   
  }

  signin(){
    return this.authService.signin(this.userAuth).subscribe(data=>{
      
      this.localStorageService.saveToken(data.access_token);
      this.profile();
      //history.go(-1);
      this.router.navigate(['chat'])

    })
  }

  profile(){
    
    this.authService.profile();
    

  }

  async getUser(){
    this.user=await this.localStorageService.getUser()
  }
}
