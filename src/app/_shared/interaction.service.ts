import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {Delivery} from '../_models/delivery';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private _addDelivery = new Subject<Delivery>();
  _addDelivery$ = this._addDelivery.asObservable();
  constructor() { }
  sendDelivery(delivery: Delivery){
    this._addDelivery.next(delivery);
  }

}
