import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { LoginRegisterService } from '../loginRegister.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private registerRequest: LoginRegisterService
  ) {}

  @Output() isLoginedChange = new EventEmitter<boolean>();
  @Input() isLogined: boolean;
  @Input() userName: string;

  logout() {

    this.isLoginedChange.emit(false);

    this.registerRequest.loginRegisterRequest('signin/logout', null)
    .subscribe(response => {
      console.log(response);
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.router.navigate(['/']);
    });

  }

  ngOnInit() {
    
  }

}
