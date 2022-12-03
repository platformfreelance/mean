import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-space',
  templateUrl: './space.component.html',
  styleUrls: ['./space.component.css']
})
export class SpaceComponent implements OnInit {
  gigs= []; 

  constructor(private router:Router) { 
    var token = localStorage.getItem('token');

    if(token){
      fetch('/api/gigs', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token? token: ''
        }}).then(res => res.json(
        )).then(data => {
          console.log(data);
          this.gigs = data;
        }
        ).catch(err => {
          console.log(err);
        });
    }

  }

  ngOnInit(): void {
  }

  command(id: string){
    var token = localStorage.getItem('token');
    if(token){
      fetch('/api/commande_gig', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            "gig": id,
        })
    }).then(response => {if(response.status == 200){
        console.log('commande effectuée');
        this.router.navigate(['/commands']).then(() => {
          window.location.reload();
        });
    }}).catch(err => {
        console.log(err);

    }

  )}}

}
