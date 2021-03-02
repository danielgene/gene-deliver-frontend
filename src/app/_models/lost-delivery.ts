export interface LostDelivery{
  id: number;
  customerFirstName: string;
  customerLastName: string;
  customerID: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  phoneNumber: string;
  policyID: string;
  policyName: string;
  policyTransactionDate: Date;
  policyAmount: number;
  agentID: string;
  agentName: string;
  zoneName: string;
  edd?: Date;
}
