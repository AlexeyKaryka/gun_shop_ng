import { Component, OnInit } from '@angular/core';
import { FetchDataService } from './fetch-data.service';
import { SharedService } from './shared-service.service';
import { SharedServiceFilterService } from './shared-service-filter.service';
import { LoginRegisterService } from './loginRegister.service';
import { Router } from '@angular/router';
import { SharedServiceFilterReceiverService } from './shared-service-filter-receiver.service';
import { SharedServiceFilterReceiverReverseService } from './shared-service-filter-receiver-reverse.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private loginRequest: LoginRegisterService,
    private _sharedService: SharedService,
    private _sharedServiceFilter: SharedServiceFilterService,
    private _sharedServiceFilterReceiver: SharedServiceFilterReceiverService,
    private _sharedServiceFilterReceiverReverse: SharedServiceFilterReceiverReverseService,
    private router: Router
  ){

    this.filter = {'filter': 'all'};
    
    _sharedService.changeEmitted$.subscribe(
      data => {

        this.isLogined = true;

        // this.userData = {
        //   login: data.login,
        //   name: data.name,
        //   address: data.address
        // }

        this.userName = data.name;
        this.userLogin = data.login;
        this.userAddress = data.address;

        this.orders = data.orders;
        //this.router.navigate(['/'])
      }
    );

    _sharedServiceFilter.changeEmitted$.subscribe(
      data => {
        
        this.filter = {'filter': data};
        this.router.navigate(['/models']);

      }
    );

    _sharedServiceFilterReceiverReverse.changeEmitted$.subscribe(
      data => {
          
        let temp = this.filter;
        this.filter = {'filter': 'all'};
        this._sharedServiceFilterReceiver.emitChange(temp);

      }
    )
  }

  ngOnInit() {

    this.loginRequest.loginRegisterRequest('signin/login', null)
    .subscribe(response => {

      this.isLogined = true;

      console.log('initial user fetch');
      console.log(' ' + JSON.stringify(response));
      
      // this.userData = { login: response.login,
      //   name: response.name,
      //   address: response.address
      // }
       

      this.userName = response.name;
      this.userLogin = response.login;
      this.userAddress = response.address;

      this.orders = response.orders;
      //this.router.navigate(['/']);
      
    }, error => {
      this.isLogined = false;
      console.log('initial login error');
    });

  }

  isLoginedChange(param: boolean){
    this.isLogined = param;
  }


  filter: any //filter for models which is transfered within shared services
  isLogined: boolean
  //userData: any //name, login, maybe address of current logined user
  userName: string
  userLogin: string
  userAddress: string
  orders: any //orders of current logined user

}
