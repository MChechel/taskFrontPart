import { Component, OnInit } from '@angular/core';
import { debounceTime, Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { ClientService } from './client-service';
import { LoanApplicationService } from './loan-application-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { theLoanApplication } from './loan-application.model';
@Component({
  selector: 'task-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {
  clients:any[]=[];
  loans:any[]=[];
  loan:any;
  closeResult = '';
  isEditing:boolean = false;

  form:FormGroup = new FormGroup({
    id:new FormControl(''),
    firstName: new FormControl('',[Validators.required]),
    lastName: new FormControl('',[Validators.required]),
    personalCode: new FormControl('',[Validators.required]),
    loanType: new FormControl('',[Validators.required]),
    loanSum: new FormControl('',[Validators.required]),
    email: new FormControl('',[Validators.required,Validators.email]),
    phoneNumber: new FormControl('',[Validators.required]),
    address: new FormControl('',[Validators.required]),
  });
  QUSTION_FORM={
    id:null,
    firstName:null,
    lastName:null,
    personalCode:null,
    loanType:null,
    loanSum:null,
    email:null,
    phoneNumber:null,
    address:null,
  }

  constructor(private clientService:ClientService,private loanAppService:LoanApplicationService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getLoans();
  }


  getClients():void{
    debounceTime(500);
    this.clientService.getClients().subscribe((c) =>{
      console.log(c);
      this.clients = c.clientList;
    });
    }

    getLoans():void{
      debounceTime(500);
       this.loans = [];
      this.loanAppService.getLoanApp().subscribe((c) =>{
        c.loansList.forEach((applicationVar: { client: { appCount: object; id: number; }; }) => {
          this.loanAppService.getClientAppCount(applicationVar.client.id).subscribe((v)=>{
            (applicationVar.client.appCount) = v;
            console.log(applicationVar.client.appCount)
          });
            this.loans.push(applicationVar);
        });
      });
      }

      getLoan(id:number):void{
        this.loanAppService.getLoanAppwithId(id).subscribe((c) =>{
          console.log(c);

          this.form.setValue({
            id:id,
            firstName:c.client.firstName,
            lastName:c.client.lastName,
            personalCode:c.client.personalCode,
            loanType:c.loanType,
            loanSum:c.loanSum,
            email:c.client.email,
            phoneNumber:c.client.phoneNumber,
            address:c.client.address,
           })
        });
        }

      deleteLoanApplication(id:number):void{
        this.loanAppService.deleteApplication(id).subscribe(()=>{
          console.log(`Item # ${id} is deleted!`);
          debounceTime(250);
          this.getLoans();
        });}


      deleteAllLoanApplications():void{
        this.loanAppService.deleteApplications().subscribe(()=>{
          this.clientService.deleteAllClients().subscribe(()=>{
          this.getLoans();
        })
        });


      }
      open(content: any) {
        this.isEditing=false;
        this.form.setValue({
          id:null,
          firstName:null,
          lastName:null,
          personalCode:null,
          loanType:null,
          loanSum:null,
          email:null,
          phoneNumber:null,
          address:null,
         })

        this.modalService.open(content,
       {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult =
             `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      openToUpdate(content: any,id:number) {
        this.isEditing=true;
        this.getLoan(id);
        this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
          this.closeResult =
             `Dismissed ${this.getDismissReason(reason)}`;
        });
      }

      private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return `with: ${reason}`;
        }
      }

      onSubmit():void{
        if(this.isEditing){
        //  console.log('It is update value');
         // console.log(this.form.value);
          this.loanAppService.putApplication(this.form.value).subscribe(()=>{
            this.getLoans();
//            this.form.reset;
          })
        }else{
         // console.log('It is newly registered values');
         // console.log(this.form.value);

          this.loanAppService.postApplication(this.form.value).subscribe(()=>{
            this.modalService.dismissAll;
            this.getLoans();
          })
        }
        this.modalService.dismissAll();

        }

        saveSQL():void{
          this.loanAppService.saveFile().subscribe(data=>{
            console.log('file is saved');
          })
        }

}
