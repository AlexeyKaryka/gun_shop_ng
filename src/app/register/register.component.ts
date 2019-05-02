import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { LoginRegisterService } from '../loginRegister.service';
import { SharedService } from '../shared-service.service';
import { Router } from '@angular/router';

class RegisterModel {
  'password': string
  'login': string
  'name': string
  'address': string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private registerRequest: LoginRegisterService,
    private _sharedService: SharedService, 
    private router: Router
  ) { }

  registerModel: RegisterModel = new RegisterModel;
  existingLogin: boolean;

  onSubmitRegister(): void {
    console.log(JSON.stringify(this.registerModel));
    this.registerRequest.loginRegisterRequest('signin/register', this.registerModel)
    .subscribe(response => {

      console.log(response);
      
      this._sharedService.emitChange(response);
      this.router.navigate(['/']);
      
    }, error => {
      this.existingLogin = true;
    });
  }

  ngOnInit() {
    this.existingLogin = false;
  }

}
