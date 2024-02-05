import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Customer } from 'src/app/Class/customer';
import { ApiService } from 'src/app/Service/api.service';
import { DateTime } from 'luxon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  I!:any;
  N!:any;
  C!:any;
  D!:any;
  currentItem = 'Television';
  City!:any;
  StreetAddress!:any;
  Phone!:any;
  displayedData: any[] = [];
  pageSize: number = 10;
  currentPage: number = 1;
  totalPages: number = 1;
  
  showView!:boolean;
  Value !: FormGroup;
  customerData !: any;
  showAdd!: boolean;
  showupdate!:boolean;
  constructor(private formbuilder: FormBuilder,private api : ApiService) { }
  
  CustomerModelObj :Customer= new Customer();
  ngOnInit(): void {
    this.Value= this.formbuilder.group({
      id:[''],
      Price:[''],
      Country:[''],
      FirstName:[''],
      LastName:[''],
      City:[''],
      StreetAddress:[''],
      Phone:['']
  
    })
    this.getAllCustomer();
  }
  postProductDetails(){
    this.CustomerModelObj.id= this.Value.value.id;

    
    this.CustomerModelObj.Price= this.Value.value.Price;
    this.CustomerModelObj.Country= this.Value.value.Country;
    this.CustomerModelObj.CreatedDate= Date();
    this.CustomerModelObj.FirstName= this.Value.value.FirstName;
    this.CustomerModelObj.LastName= this.Value.value.LastName;
    this.CustomerModelObj.City= this.Value.value.City;
    this.CustomerModelObj.StreetAddress= this.Value.value.StreetAddress;
    this.CustomerModelObj.Phone= this.Value.value.Phone;



    



    console.log(this.CustomerModelObj.Price)







  this.api.postCustomer(this.CustomerModelObj)
  .subscribe(res=>{
    console.log(res);
    alert("Customer Added Successfully");
    let ref= document.getElementById('cancel')

    ref?.click();
    this.Value.reset();
    this.getAllCustomer();
    
  },
  err=>{
    alert("Something went wrong")
  })
  }
  getAllCustomer(){
    this.api.getCustomer()
    .subscribe(res=>{
      this.customerData =res;
      this.totalPages = Math.ceil(this.customerData.length / this.pageSize);
      this.updateDisplayedData();

    })
  }
  deleteCustomer(n:any){
    this.api.deleteCustomer(n.id)
    .subscribe(res=>{
      alert("Customer Deleted")
      
      let ref= document.getElementById('cancel')

    ref?.click();
    this.Value.reset();
    this.getAllCustomer();
    })
  }

  onEdit(row: any){
    this.showView=false;

    this.showAdd= false;
    this.showupdate= true;
    this.CustomerModelObj.id= row.id;
    this.Value.controls['Price'].setValue(row.Price);
    this.Value.controls['Country'].setValue(row.Country);
    this.Value.controls['FirstName'].setValue(row.FirstName);
    this.Value.controls['LastName'].setValue(row.LastName);
    this.Value.controls['City'].setValue(row.City);
    this.Value.controls['StreetAddress'].setValue(row.StreetAddress);
    this.Value.controls['Phone'].setValue(row.Phone);




    this.City=row.City;
    this.StreetAddress=row.StreetAddress;
    this.Phone=row.Phone;
    console.log(Date())


    


  




  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedData();
    }
  }
  onView(row: any){
    this.showAdd= false;
    this.showupdate= false;
    this.showView=true;
    



    this.I=row.id;
    this.N=row.Price;
    this.C=row.Country;
    this.D=row.CreatedDate;
    console.log(Date())
  }


  updateProductDetails(){
    this.CustomerModelObj.Price= this.Value.value.Price;
    this.CustomerModelObj.Country= this.Value.value.Country;
    this.CustomerModelObj.CreatedDate= this.Value.value.CreatedDate;
    this.CustomerModelObj.FirstName= this.Value.value.FirstName;
    this.CustomerModelObj.LastName= this.Value.value.LastName;
    this.CustomerModelObj.City=this.Value.value.City;
    this.CustomerModelObj.StreetAddress=this.Value.value.StreetAddress;
    this.CustomerModelObj.Phone=this.Value.value.Phone;




    
    this.api.updateCustomer(this.CustomerModelObj,this.CustomerModelObj.id)
    .subscribe(res=>{
      alert("Update Successfully")
      let ref= document.getElementById('cancel')

    ref?.click();
    this.Value.reset();
    this.getAllCustomer();
    })

  }

  clickAddCustomer(){
    this.Value.reset();
    this.showAdd= true;
    this.showupdate= false;
    this.showView=false;

  }

  updateDisplayedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayedData = this.customerData.slice(startIndex, endIndex);
  }


  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedData();
    }
  }

}
