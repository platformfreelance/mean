import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-commands',
  templateUrl: './commands.component.html',
  styleUrls: ['./commands.component.css']
})
export class CommandsComponent implements OnInit {
  gigs= []; 

  constructor() { 
    var token = localStorage.getItem('token');

    if(token){
      fetch('/api/my_commands', {
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

  markAsDone(id: string){
    var token = localStorage.getItem('token');
    if(token){
      fetch('/api/confirm_command', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            "command": id,
        })
    }).then(response => {if(response.status == 200){
        console.log('commande validé');
        window.location.reload();
    }}).catch(err => {
        console.log(err);
    })}}

  ngOnInit(): void {
  }

}
