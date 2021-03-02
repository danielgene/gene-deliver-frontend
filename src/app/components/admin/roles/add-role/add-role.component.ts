import { Component, OnInit } from '@angular/core';
import {RestService} from '../../../../_shared/rest.service';
import {AlertifyService} from '../../../../_shared/alertify.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent implements OnInit {
  model: any = {};
  constructor(private restService: RestService, private alertifyService: AlertifyService, private router: Router) { }

  ngOnInit(): void {
  }
  addRole(){
    console.log(this.model);
    console.log(this.model.name);
    this.restService.addRole(this.model.name).subscribe(response => {
      this.alertifyService.success('New Role Added');
      this.router.navigate(['/roles']);
    }, error => {
      this.alertifyService.error('Error Adding role');
    })
  }

}
