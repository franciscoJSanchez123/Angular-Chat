import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { AuthService } from '../../services/authService/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User={
    name:"",
    password:"",
    email:"",
    ordersId:[],
    admin:false
  }
  
  constructor(
    private authService:AuthService,
    private router:Router
    ) { }

  ngOnInit(): void {
  }

  create(){
    this.authService.create(this.user).subscribe();
    this.router.navigate([''])
  }
}
