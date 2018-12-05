import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/httpService';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
   

    constructor(
      private httpService: HttpService,
      private router: Router,
      private route: ActivatedRoute,
    ) { }

    users:any;

    ngOnInit() {
      this.index();
    }

    index(){
      this.httpService.get('users').subscribe(response => {
        console.log('response', response);
        this.users = response.users;
      });
    }
}