import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  baseUrl:string = 'http://localhost:8080/api/clients'

  constructor(private http:HttpClient, private route:ActivatedRoute) {

  }


  getClients():Observable<any>{
    let qp = new HttpParams();
    //this.route.queryParams.subscribe(queryParams =>{
     // if(queryParams['surveyId']){
        //qp = qp.append("surveyId",queryParams['surveyId']);
      //}
   // })
    return this.http.get(`${this.baseUrl}/`)
  }

  deleteAllClients():Observable<any>{
    return this.http.delete(`${this.baseUrl}/`)
  }
}
