import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../services/authentication.service';
import { database } from 'firebase';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { Command } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  operation:string= 'login';
  cookieValue = 'UNKNOWN';
  email:string = null;
  password:string = null;
  nick:string = null;

  constructor(private cookieService: CookieService,private autenticationService:AuthenticationService,private userService:UserService,private router:Router) { 
    
    // this.cookieService.set( 'Test', 'Hello World' );
    // this.cookieValue = this.cookieService.get('Test');
    // console.log(this.cookieValue);
    // const cookieExists: boolean = cookieService.check('Test');
    // console.log(cookieExists);

  }

  ngOnInit() {
   
  }

  login(){

    this.autenticationService.loginWithEmail(this.email,this.password).then(
      res => { // Success
        alert('loggueado correctamente');        
        console.log(res);
        this.router.navigate(['/home']);
      },
      msg => { // Error
        alert('Error');
        console.log(msg);
      }
    );

  }

  register(){

    this.autenticationService.registerWithEmail(this.email,this.password).then(
      res => { // Success
        const user = {
          uid:res.user.uid,
          email:this.email,
          nick:this.nick
        }
        this.userService.createUser(user).then(res2 => {
          alert('registrado correctamente');
          console.log(res2);
        },
        msg =>{
          alert('Error');
          console.log(msg);
        })       
      },
      msg => { // Error
        alert('Error');
        console.log(msg);
      }
    )
    
    ;

  }

}
