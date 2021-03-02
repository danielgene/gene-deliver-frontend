import {ZoneArea} from './zone-area';

export interface Delivery{
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
  jobStatus: number;
  edd?: Date;
  tdd?: string;
  aging?: string;
}
