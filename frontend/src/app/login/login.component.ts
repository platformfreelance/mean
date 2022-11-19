import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private apiService:ApiService, route:ActivatedRoute, router:Router) {
    route.data.subscribe(params => {
      if(params['logout']){
        localStorage.removeItem('token');
        router.navigate(['/login']).then(() => {
          window.location.reload();
        });
      }
   })}

  ngOnInit(): void {
   } 

  loginUser(user:any)
  {
    this.apiService.loginUser(user);
    console.log(user);
  }

  logoutUser(){
    localStorage.removeItem('token');
  }
}