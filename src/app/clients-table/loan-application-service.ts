import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ClientService } from './client-service';
import { theClient } from './client.model';
import { theLoanApplication } from './loan-application.model';


@Injectable({
  providedIn: 'root'
})
export class LoanApplicationService {

  baseUrl:string = 'http://localhost:8080/api/loanApp'

  constructor(private http:HttpClient, private route:ActivatedRoute) {

  }

  getLoanApp():Observable<any>{
    return this.http.get(`${this.baseUrl}/`)
  }

  getLoanAppwithId(id:number):Observable<any>{
    return this.http.get(`${this.baseUrl}/${id}`)
  }

  getClientAppCount(clientID:any):Observable<object>{
    let qp = new HttpParams();
    qp = qp.append("clientId",clientID);
    //return this.http.put(`${this.baseUrl}/${question.id}`,question,{params:qp});
    return this.http.get(`${this.baseUrl}/client`,{params:qp})
  }

  deleteApplication(id:number):Observable<any>{
    return this.http.delete(`${this.baseUrl}/${id}`)
  }

  deleteApplications():Observable<any>{
    return this.http.delete(`${this.baseUrl}`);

  }

  putApplication(loanApp:any):Observable<any>{
    return this.http.put(`${this.baseUrl}/${loanApp.id}`,loanApp);
  }


  postApplication(loanApp:theLoanApplication):Observable<any>{
   return this.http.post(`${this.baseUrl}`,loanApp);
  }


  saveFile():Observable<any>{
    return this.http.put(`${this.baseUrl}/save`,'');
  }

}
