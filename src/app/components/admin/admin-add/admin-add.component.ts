import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../_shared/rest.service';
import {AlertifyService} from '../../../_shared/alertify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-add',
  templateUrl: './admin-add.component.html',
  styleUrls: ['./admin-add.component.css']
})
export class AdminAddComponent implements OnInit {
  model: any = {};
  constructor(private restService: RestService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }
  addSuper(){
    console.log(this.model);
    this.restService.addAdmin(this.model).subscribe(response =>{
      this.alertifyService.success('New Admin User Added');
      this.router.navigate(['/drivers']);
    }, error => {
      this.alertifyService.error('Cannot add new user, try again');
    })
  }
}
