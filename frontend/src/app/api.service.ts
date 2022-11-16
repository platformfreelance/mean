import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }
  registerUser(user:any){
    this.http.post('/api/register',user).subscribe({
      next: data => {
        this.router.navigate(['/login'])
        console.log("Welcome to the club! You can now log in.");
        console.log(data);
      }
    })
  }
}
