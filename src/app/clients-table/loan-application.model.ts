import { theClient } from "./client.model";

export interface theLoanApplication{
  id:number;
  amount:string;
  type:string;
  date:string;
  client:theClient;
}

export interface theClientDTO{
  listOfClients:any[];
  pageNum:number;
  totalItems:number;
}
