import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../_shared/rest.service';
import {AlertifyService} from '../../../../_shared/alertify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agent-add',
  templateUrl: './agent-add.component.html',
  styleUrls: ['./agent-add.component.css']
})
export class AgentAddComponent implements OnInit {
  model: any = {};
  constructor(private restService: RestService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }
  addAgent(){
    console.log(this.model);
    this.restService.addAgent(this.model).subscribe(response =>{
      this.alertifyService.success('New User Added');
      this.router.navigate(['/drivers']);
    }, error => {
      this.alertifyService.error('Cannot add new user, try again');
    })
  }

}
