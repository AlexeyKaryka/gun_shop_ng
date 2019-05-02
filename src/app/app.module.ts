import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CategoriesComponent } from './categories/categories.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { GunItemComponent } from './gun-item/gun-item.component';
import { BrandItemComponent } from './brand-item/brand-item.component';
import { TypeItemComponent } from './type-item/type-item.component';
import { AppRoutingModule } from './/app-routing.module';
import { GunListComponent } from './gun-list/gun-list.component';
import { BrandListComponent } from './brand-list/brand-list.component';
import { TypeListComponent } from './type-list/type-list.component';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderItemComponent } from './order-item/order-item.component';
import { FetchDataService } from './fetch-data.service';
import { LoginRegisterService } from './loginRegister.service';
import { SharedService } from './shared-service.service';
import { SharedServiceFilterService } from './shared-service-filter.service';
import { SharedServiceFilterReceiverService } from './shared-service-filter-receiver.service';
import { MainComponent } from './main/main.component';
import { PagerService } from './pager.service';
import { SharedServiceFilterReceiverReverseService } from './shared-service-filter-receiver-reverse.service';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CategoriesComponent,
    RegisterComponent,
    LoginComponent,
    GunItemComponent,
    BrandItemComponent,
    TypeItemComponent,
    GunListComponent,
    BrandListComponent,
    TypeListComponent,
    OrderListComponent,
    OrderItemComponent,
    MainComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    PagerService,
    FetchDataService,
    LoginRegisterService, 
    SharedService,
    SharedServiceFilterService,
    SharedServiceFilterReceiverService,
    SharedServiceFilterReceiverReverseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
