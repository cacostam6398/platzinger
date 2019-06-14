import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  friends:User[];
  query:string = '';
  user:User;
  constructor(private userService: UserService, private authenticationService:AuthenticationService,private router:Router) { 
    
    this.authenticationService.getStatus().subscribe((next)=> {
      this.userService.getUserById(next.uid).valueChanges().subscribe((data : User) =>
      {
          this.user = data;
          console.log(this.user);
      },(error)=>{
        console.log(error)
      });
    },(error) =>{
      console.log(error)
    });

    userService.getUsers().valueChanges()
     .subscribe((x: User[]) => {
       this.friends = x;
     },error => {
       console.log(error);
     }) ;
 
  }

  logOut(){
    this.authenticationService.logOut().then((reject) => {
      alert('Sesion Cerrada');
      this.router.navigate(['/login']);
    }).catch((error) =>{

    });
  }

  ngOnInit() {
  }

}
