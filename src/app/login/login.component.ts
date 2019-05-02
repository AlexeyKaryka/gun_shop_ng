import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginRegisterService } from '../loginRegister.service';
import { SharedService } from '../shared-service.service';
import { Router } from '@angular/router';

class loginModel {
  'password': string
  'login': string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private loginRequest: LoginRegisterService,
    private _sharedService: SharedService, 
    private router: Router
  ) { }

  invalidCreds: boolean

  loginModel: loginModel = new loginModel

  onSubmitLogin(): void {
    console.log('you sent this form to server: ' + JSON.stringify(this.loginModel));
    this.loginRequest.loginRegisterRequest('signin/login', this.loginModel)
    .subscribe(response => {

      console.log(this.invalidCreds);
      console.log(response);
      
      this.invalidCreds = false;
      this._sharedService.emitChange(response);
      this.router.navigate(['/']);
      
    }, error => {

      this.invalidCreds = true;

    });
  }

  ngOnInit() {
    this.invalidCreds = false;
  }

}
