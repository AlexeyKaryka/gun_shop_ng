import { Component, OnInit } from '@angular/core';
// import { LoginRegisterService } from '../loginRegister.service';
// import { SharedService } from '../shared-service.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    // private loginRequest: LoginRegisterService,
    // private _sharedService: SharedService,
    // private router: Router
  ) { }

  ngOnInit() {

    // this.loginRequest.loginRegisterRequest('signin/login', null)
    // .subscribe(response => {

    //   console.log(response);
      
    //   this._sharedService.emitChange(response);
    //   this.router.navigate(['/']);
      
    // }, error => {
      
    // });

  }

}
