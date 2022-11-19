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
        if((data as {[key: string]: any})['success'] == true){
          console.log("You are logged in!");
          localStorage.setItem('token', (data as {[key: string]: any})['token']);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
        else{
          console.log("Wrong username or password!");
        }
        // console.log("You are now logged in.");
        // this.router.navigate(['/'])
        // console.log(data);
      }
    })
  }
  loginUser(user:any){
    this.http.post('/api/login',user).subscribe({
      next: data => {
        if((data as {[key: string]: any})['success'] == true){
          console.log("You are logged in!");
          localStorage.setItem('token', (data as {[key: string]: any})['token']);
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }
        else{
          console.log("Wrong username or password!");
        }
        // console.log("You are now logged in.");
        // this.router.navigate(['/'])
        // console.log(data);
      }
    })
  }
}
