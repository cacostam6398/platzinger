import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  operation:string= 'login';
  cookieValue = 'UNKNOWN';
  constructor(private cookieService: CookieService) { 
    
    this.cookieService.set( 'Test', 'Hello World' );
    this.cookieValue = this.cookieService.get('Test');
    console.log(this.cookieValue);
    const cookieExists: boolean = cookieService.check('Test');
    console.log(cookieExists);
  }

  ngOnInit() {
   
  }

}
