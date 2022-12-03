import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css']
})
export class ListingComponent implements OnInit {
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

  addGig(gig:any){
    var token = localStorage.getItem('token');
    console.log(JSON.stringify(gig));
    if(token){
      fetch('/api/add_gig', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token? token: ''
        },
        body: JSON.stringify(gig)
      }).then(res => res.json(
        )).then(data => {
          this.router.navigate(['/profile']).then(() => {
            window.location.reload();
          });
        }
        ).catch(err => {
          console.log(err);
        });
    }
  }


  ngOnInit(): void {
  }

}
