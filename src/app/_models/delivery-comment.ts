import {Delivery} from './delivery';

export interface DeliveryComment{
  id: number;
  delivery: Delivery;
  deliveryId: number;
  callTime: Date;
  comment: string;
}
