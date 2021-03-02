import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, pipe, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Delivery} from '../_models/delivery';
import {UserView} from '../_models/userView';
import {LostDelivery} from '../_models/lost-delivery';
import {Zone} from '../_models/zone';
import {ZoneArea} from '../_models/zone-area';
import {ZoneOwner} from '../_models/zone-owner';
import {DeliveryComment} from '../_models/delivery-comment';
import {DeliveryView} from '../_models/delivery-view';
import {MatTableDataSource} from "@angular/material/table";
import {AlertifyService} from "./alertify.service";
import {EventEmitter} from "events";

@Injectable({
  providedIn: 'root'
})
export class RestService {

  public deliveryViews: DeliveryView[] = [];

  public incompleteDeliveryViews: DeliveryView[] = [];

  public completeDeliveryViews: DeliveryView[] = [];

  public notStartedViews: DeliveryView[] = [];

  public inProgress: DeliveryView[] = [];

  public drivers: UserView[] = [];

  baseUrl = environment.apiUrl;

  isLoading: boolean = false;

  async startPreloading() {
    this.isLoading = true;
   // this.doneLoading.emit(this.isLoading);
    await this.preloadDeliveryViews();
  }

  preloadingObservable = new Observable((observer) => {
    this.startPreloading().then(r => observer.next(true));
  });

  async preloadDeliveryViews() {
    this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries', this.httpOptions).subscribe(
      data => {
        console.log('all deliveries loaded');
        this.deliveryViews = data;
        console.log(this.deliveryViews);
        this.preloadIncompleteDeliveries();
      },

      error => {
        //that stage failed lets try imwe yacho
        this.preloadIncompleteDeliveries();
        console.log(error);
      }
    );
  }

  async preloadInProgressDeliveries() {
    this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/inprogress', this.httpOptions)
      .subscribe(
        data => {
          console.log('pre loading inprogress deliveries');
          this.inProgress = data;
          console.log(this.deliveryViews);
          this.alertifyService.success("Data loaded");

          this.isLoading = false;
         // this.doneLoading.emit(this.isLoading);
        },
        error => {
          alert("Unable to load data please reload this page");
          console.log(error);
          this.isLoading = false;
        }
      );
  }

  async preloadIncompleteDeliveries() {
    this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/incomplete', this.httpOptions)
      .subscribe(
        data => {
          console.log('pre loading incomplete deliveies');
          this.incompleteDeliveryViews = data;
          console.log(this.deliveryViews);

          this.preloadCompleteDeliveries();
        },

        error => {
          this.preloadCompleteDeliveries();
          console.log(error);
        }
      );
  }

  async preloadCompleteDeliveries() {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/completed', this.httpOptions)
      .subscribe(
        data => {
          console.log('loaded completed deliveries');
          this.completeDeliveryViews = data;
          console.log(this.deliveryViews);

          this.preloadNotStartedDeliveries();
        },

        error => {
          this.preloadNotStartedDeliveries();
          console.log(error);
        }
      )
  }

  async preloadNotStartedDeliveries() {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/notstarted', this.httpOptions)
      .subscribe(
        data => {
          console.log('pre loading not started deliveries');
          this.notStartedViews = data;
          console.log(this.deliveryViews);
          this.preloadDrivers();
        },
        error => {
          console.log(error);
          this.preloadDrivers();
        }
      )
  }

  async preloadDrivers() {
    return this.http.get<UserView[]>(this.baseUrl + 'auth/drivers/active', this.httpOptions)
      .subscribe(
        data => {
          this.drivers = data;
          this.preloadInProgressDeliveries();
        }, error => {
          console.log(error);
          this.preloadInProgressDeliveries();
        }
      );
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  httpPostOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient, private alertifyService: AlertifyService) {
  }

  /*
  getAllAllocations(): Observable<Allocation[]>{
    return this.http.get<Allocation[]>(this.baseUrl + 'allocations', this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  getCompleteAllocations(): Observable<Allocation[]>{
    return this.http.get<Allocation[]>(this.baseUrl + 'allocations/complete', this.httpOptions)
  }
  getIncompleteAllocations(): Observable<Allocation[]>{
    return this.http.get<Allocation[]>(this.baseUrl + 'allocations/incomplete', this.httpOptions)
  }
  getAllocation(id: number): Observable<Allocation>{
    return  this.http.get<Allocation>(this.baseUrl+'allocations/'+id, this.httpOptions);
  }
  getAllocationComments(allocationID: number): Observable<AllocationComment[]>{
    return this.http.get<AllocationComment[]>(this.baseUrl + 'allocationcomments/comments/' + allocationID, this.httpOptions);
  }
  addAllocationComment(allocationComment: any){
    allocationComment.callerID = localStorage.getItem('userId');
    return this.http.post(this.baseUrl+ 'allocationcomments',allocationComment, this.httpPostOptions)
      .pipe(
        map((response: any) => {
          console.log(response)
        })
      )
  }
  addDelivery(allocation: Allocation): Observable<Delivery>{
    return this.http.post<Delivery>(this.baseUrl + 'deliveries', allocation, this.httpPostOptions)
      .pipe(catchError(this.handleError))
  }
  */
  addRole(name: string): Observable<string> {
    return this.http.get<string>(this.baseUrl + 'auth/roles/' + name, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getAgentAll(): Observable<DeliveryView[]> {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/GetAgentAll', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getAgentComplete(): Observable<DeliveryView[]> {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/agentcomplete', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  //its now working yanga ichida kuti tiite restart server
  //i think so, you might wnt to look into your server performace, open task manager and see you mem usage uone
  // ndakubaya ini, talk later baba
  getAgentIncomplete(): Observable<DeliveryView[]> {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/agentincomplete', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getReport(model: any): Observable<DeliveryView[]> {
    return this.http.post<DeliveryView[]>(this.baseUrl + 'deliveries/ReportView', model, this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  getDeliveryView(): Observable<DeliveryView[]> {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getDelivery(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(this.baseUrl + 'deliveries/' + id, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  // getAllDeliveries(): Observable<Delivery[]>{
  //   return this.http.get<Delivery[]>(this.baseUrl + 'deliveries', this.httpOptions)
  //     .pipe(catchError(this.handleError));
  // }
  markDone(deliveryID: number): Observable<Delivery> {
    return this.http.get<Delivery>(this.baseUrl + 'deliveries/markdone/' + deliveryID, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getCompletedDeliveries(): Observable<DeliveryView[]> {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/completed', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getInProgressDeliveries(): Observable<DeliveryView[]> {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/inprogress', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  updateDelivery(delivery: Delivery): Observable<Delivery> {
    return this.http.post<Delivery>(this.baseUrl + 'deliveries/update', delivery, this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  getIncompleteDeliveries(): Observable<DeliveryView[]> {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/incomplete', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getNotStarted(): Observable<DeliveryView[]> {
    return this.http.get<DeliveryView[]>(this.baseUrl + 'deliveries/notstarted', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getMyIncomplete(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.baseUrl + 'deliveries/myincomplete', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getMyComplete(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.baseUrl + 'deliveries/mycomplete', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  startDelivery(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(this.baseUrl + 'deliveries/start/' + id, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  stopDelivery(id: number): Observable<Delivery> {
    return this.http.get<Delivery>(this.baseUrl + 'deliveries/stop/' + id, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  allocateDeliveries(model: any) {
    return this.http.post(this.baseUrl + 'h', model, this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  getDrivers(): Observable<UserView[]> {
    return this.http.get<UserView[]>(this.baseUrl + 'auth/drivers', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getDriver(driverID: string): Observable<UserView> {
    return this.http.get<UserView>(this.baseUrl + 'auth/drivers/' + driverID, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getActiveDrivers(): Observable<UserView[]> {
    return this.http.get<UserView[]>(this.baseUrl + 'auth/drivers/active', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  addDriver(driver: any) {
    return this.http.post(this.baseUrl + 'auth/drivers', driver, this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  addSuper(model: any) {
    return this.http.post(this.baseUrl + 'auth/addsuper', model, this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  addAdmin(model: any) {
    return this.http.post(this.baseUrl + 'auth/addadmin', model, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  addAgent(model: any) {
    return this.http.post(this.baseUrl + 'auth/addagent', model, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getAgents(): Observable<UserView[]> {
    return this.http.get<UserView[]>(this.baseUrl + 'auth/allagents', this.httpOptions)
    pipe(catchError(RestService.handleError));
  }

  getMyDeliveries(): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.baseUrl + 'deliveries/mydeliveries', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getDriverDeliveries(driverID: number): Observable<Delivery[]> {
    return this.http.get<Delivery[]>(this.baseUrl + 'deliveries/driverdeliveries/' + driverID, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getLostDeliveries(): Observable<LostDelivery[]> {
    return this.http.get<LostDelivery[]>(this.baseUrl + 'deliveries/lostdeliveries', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getLostDelivery(id: number): Observable<LostDelivery> {
    return this.http.get<LostDelivery>(this.baseUrl + 'deliveries/lostdelivery/' + id, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  addDeliveryComment(model: any): Observable<DeliveryComment> {
    return this.http.post<DeliveryComment>(this.baseUrl + 'deliverycomments', model, this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  getDeliveryComments(id: number): Observable<DeliveryComment[]> {
    return this.http.get<DeliveryComment[]>(this.baseUrl + 'deliverycomments/GetDeliveryComments/' + id, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getAllComments(): Observable<DeliveryComment[]> {
    return this.http.get<DeliveryComment[]>(this.baseUrl + 'deliverycomments/GetAllComments', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  postLostDelivery(lostDelivery: any) {
    return this.http.post(this.baseUrl + 'deliveries/addlostdelivery', lostDelivery, this.httpPostOptions)
      .pipe(catchError(RestService.handleError))
  }

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.baseUrl + 'zones/zones', this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  addZone(model: any): Observable<Zone> {
    return this.http.post<Zone>(this.baseUrl + 'zones/zones', model, this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  getZoneAreasByZone(zoneID: number): Observable<ZoneArea[]> {
    return this.http.get<ZoneArea[]>(this.baseUrl + 'zones/zoneareas/' + zoneID, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  // addZoneArea(model: any): Observable<ZoneArea> {
  //   return this.http.post<ZoneArea>(this.baseUrl + 'zones/addZoneArea', model, this.httpPostOptions)
  //     .pipe(catchError(RestService.handleError));
  // }

  getDriverZone(driverID: string): Observable<ZoneOwner> {
    return this.http.get<ZoneOwner>(this.baseUrl + 'zones/GetDriverZone/' + driverID, this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  getZoneWithNoDrivers(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.baseUrl + 'zones/ZoneWithNoDrivers', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  assignZone(model: any): Observable<ZoneOwner> {
    return this.http.post<ZoneOwner>(this.baseUrl + 'zones/assignzone', model, this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  getDriverWithNoZones(): Observable<UserView[]> {
    return this.http.get<UserView[]>(this.baseUrl + 'auth/DriverWithNoZone', this.httpOptions)
      .pipe(catchError(RestService.handleError));
  }

  swapDrivers(model: any): Observable<string> {
    return this.http.post<string>(this.baseUrl + 'zones/swapdriver', model, this.httpPostOptions)
      .pipe(catchError(RestService.handleError));
  }

  private static handleError(error: HttpErrorResponse) {
    console.log(error.status);
    console.log(error.message);
    // alert('Error Occured, refresh the page, if problem persists contact the admin');
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
