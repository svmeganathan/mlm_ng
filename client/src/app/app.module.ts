import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Services
import { HttpService } from './services/httpService';

// Components
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { ModifiedUsersComponent } from './users/modified-users/modified-users.component';

//packages
// import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    HomeComponent,
    ModifiedUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    // ToastrModule.forRoot({ positionClass: 'toast-top-center', maxOpened : 1 , preventDuplicates: true}),
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
