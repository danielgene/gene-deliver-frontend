import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {RestService} from '../../../../_shared/rest.service';
import {ZoneArea} from '../../../../_models/zone-area';
import {AlertifyService} from '../../../../_shared/alertify.service';
import {Zone} from "../../../../_models/zone";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-zone-areas',
  templateUrl: './zone-areas.component.html',
  styleUrls: ['./zone-areas.component.css']
})
export class ZoneAreasComponent implements OnInit {
  zoneAreas: ZoneArea[];
  model: any = {};

  constructor(private activatedRoute: ActivatedRoute,
              private restService: RestService,
              private alertifyService: AlertifyService,
              private httpClient: HttpClient,
              private route: Router) {
  }

  ngOnInit(): void {
    this.getZoneAreas();
  }

  getZoneAreas() {
    this.isLoading = true;
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(id);
    this.restService.getZoneAreasByZone(id).subscribe((response => {
      this.isLoading = false;
      this.zoneAreas = response;
      console.log(this.zoneAreas);
    }))
  }

  deleteZoneArea(zone: ZoneArea) {

    let zoneDto = {
      'zoneAreaId': zone.id,
      'zoneId': zone.zoneID,
      'zoneAreaName': zone.name
    };

    //console.log(zoneDto);

    this.isLoading = true;
    this.httpClient.post(this.restService.baseUrl + 'zoneareas/delete',
      zoneDto, this.restService.httpPostOptions).subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.getZoneAreas();
        this.alertifyService.message("Zone deleted");

      }, error => {
        this.isLoading = false;
        console.log(error);
        this.alertifyService.error("Unable to complete that request please try again");
      }
    );


  }

  //tranquil.zimhondi@gene.co.zw
  //Password@1


  zoneToEdit: any = {};
  editMode: boolean = false;
  isLoading: boolean = false;

  editZone(zz: ZoneArea) {
    this.zoneToEdit = this.zoneAreas.filter(zn => zn.name === zz.name)[0];
    this.editMode = true;
    console.log(this.zoneToEdit);
  }

  submitZoneEdits(form: NgForm) {

    let zoneDto = {
      'zoneAreaId': this.zoneToEdit.id,
      'zoneId': this.zoneToEdit.zoneID,
      'zoneAreaName': form.value.name
    };

    console.log(zoneDto);
    this.isLoading = true;
    this.httpClient.post(this.restService.baseUrl + 'zoneareas/update',
      zoneDto, this.restService.httpPostOptions).subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
        this.getZoneAreas();
        this.alertifyService.message("Zone updated");
        form.reset();
      }, error => {
        this.isLoading = false;
        console.log(error);
        this.alertifyService.error("Unable to complete that request please try again");
      }
    );
  }

  addZoneArea() {
    this.isLoading = true;
    this.model.zoneID = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.model);

    return this.httpClient.post<ZoneArea>(this.restService.baseUrl +
      'zones/addZoneArea', this.model, this.restService.httpPostOptions).subscribe(
      response => {
        this.isLoading = false;
        console.log(response);
        this.alertifyService.success('Zone Area Added ');
        this.getZoneAreas();
      }, error => {
        this.isLoading = false;
        console.log(error);
        this.alertifyService.error("Unable to complete this request");
      }
    );


  }


}
