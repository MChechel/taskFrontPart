export interface theClient{
  id:number;
  firstName:string;
  lastName:string;
  email:string;
  phoneNumber:string;
  arrdess:string;
  personalCode:string;
  applicationList:any[];
  appCount:any;
}

export interface theClientDTO{
  listOfClients:any[];
  pageNum:number;
  totalItems:number;
}
