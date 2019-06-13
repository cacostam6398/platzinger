import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  user:User;
  constructor(private userservice:UserService, private authenticationService:AuthenticationService) { 
    this.authenticationService.getStatus().subscribe((next)=> {
      this.userservice.getUserById(next.uid).valueChanges().subscribe((data : User) =>
      {
          this.user = data;
          console.log(this.user);
      },(error)=>{
        console.log(error)
      });
    },(error) =>{
      console.log(error)
    });
  }

  ngOnInit() {
  }

}
