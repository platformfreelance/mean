import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  registerUser(user:any){
    this.http.post('http://localhost:5000/register',user).subscribe({
      next: data => {
        console.log(data);
      }
    })
  }
}
