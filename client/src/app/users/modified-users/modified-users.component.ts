import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/httpService';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modified-users',
  templateUrl: './modified-users.component.html',
  styleUrls: ['./modified-users.component.css']
})
export class ModifiedUsersComponent implements OnInit {

  usersFormData:any ={};
  users:any;
  userId:any;
  userTemplateDataId:any;
  showSubmit: boolean = true;
  submitButton: boolean = false;
  sortDirection: string = 'Desc';
  sortField: string = 'id';
  order: string;
  searchValue: string = '';
  startOffset: number=0;
  endOffset: number=2;
  itemsPerPage:number=10;
  currentPage: number = 1;
  previousPageNumber: number;
  totalRecordCount: number;
  showNoRecord:boolean;

  constructor( private httpService: HttpService) { }

  ngOnInit() {
    this.index(1);
    this.usersFormData={};
  }

  /**
  * To get the email.
  *
  * @param  number currentPage 
  * @return void
  */
 index(currentPage:number){
  this.currentPage=currentPage;
  this.endOffset= this.currentPage*this.itemsPerPage;
  this.startOffset=this.endOffset-this.itemsPerPage;
  this.httpService.get('users',{ sortField:this.sortField, sortDirection:this.sortDirection,search: this.searchValue, startOffset: this.startOffset,endOffset: this.endOffset,limit:this.itemsPerPage }).subscribe(response => {
    this.users=response.users;
    this.totalRecordCount=response.count;
    if (this.totalRecordCount != 0) {
      this.showNoRecord = false;
    } else {
      this.showNoRecord = true;
    }
  });
}
/**
* To add the email template.
*
* @return void
*/
add(){
    this.httpService.post('user', this.usersFormData).subscribe(response => {
      if(!response.error) {
        // this.toastrService.success('Email Template Content Are Inserted successfully', '',{timeOut: 3000});
        this.ngOnInit();
      } else{
        // this.toastrService.error('Email Template Content Are not Inserted', '',{timeOut: 3000});
      }
    });
}
/**
* To select the particular email template for update
*
* @param noDatatype emailTemplateData  
* @return void
*/
edit(userTemplateData){
  this.userTemplateDataId = userTemplateData.id;
  this.showSubmit = false;
  this.submitButton = false;
  this.usersFormData=userTemplateData;
}

update() {
    this.usersFormData.id = this.userTemplateDataId ;
    this.httpService.put('user/'+this.userTemplateDataId, this.usersFormData).subscribe(response => {
      if(!response) {
        this.index(1);
        // this.toastrService.success('Email Template Content Are Updated successfully', '',{timeOut: 3000});
      } else{
        // this.toastrService.error('Email Template Content Are Not Updated successfully ', '',{timeOut: 3000});
      }
    });
}
/**
* To delete the particular menu.
*
* @param noDatatype id 
* @return void
*/ 
delete(id){
  this.userId = id;
  this.httpService.delete('user/'+this.userId,{}).subscribe(response => {
    this.ngOnInit();
    // this.toastrService.success('Email Template deleted successfully', '',{timeOut: 3000});
  });
}
/**
* To sort the email template fields.
*
* @param  string value 
* @return void
*/
sort(value: string) {
  if (this.sortDirection != 'Desc') {
    this.sortDirection = 'Desc';
  }
  else {
    this.sortDirection = 'Asc';
  }
    this.order = value;
    this.sortField = value;
    this.index(1);
}

/**
* To search the data.
*
* @param  string searchValue 
* @return void
*/
search(searchValue){
  this.searchValue= searchValue;
  this.index(1);
}

/**
* To reset the field value 
*
* @return void
*/
resetSearch() {
  this.searchValue = '';
  this.ngOnInit();
}

cancel(){
  this.usersFormData={};
  this.ngOnInit();
}

}
