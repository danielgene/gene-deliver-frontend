import {ZoneArea} from './zone-area';
import {DeliveryComment} from './delivery-comment';

export interface DeliveryView{
  id: number;
  customerFirstName: string;
  customerLastName: string;
  // customerID: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  phoneNumber: string;
  policyID: string;
  // policyName: string;
  policyTransactionDate: Date;
  policyAmount: number;
  //agentID: string;
  agentName: string;
  zoneArea: ZoneArea;
  zoneAreaID: number;
  startTime: Date;
  endTime: Date;
  ownerID: string;
  jobStatus: string;
  duration: string;
  //deliveryComments: DeliveryComment[];
  comments: string;
  edd?: Date;
  ttd?: string;
  aging?: string;

}
