import { getLocaleDayNames } from '@angular/common';
import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'frontend';
  token = localStorage.getItem('token')? false: true;
  data = '';
  constructor(){
    var token = localStorage.getItem('token');
    if(token){
      fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token? token: ''
        }}).then(res => res.json(
        )).then(data => {
          this.data = String(data.firstname).concat(' ', data.lastname);
        }
        ).catch(err => {
          console.log(err);
        });
    }

  }
}




function getData() {
  var token = localStorage.getItem('token');
  fetch('/api/profile', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token? token: ''
    }}).then(res => res.json(
    )).then(data => {
      return data
    }
    )
}

