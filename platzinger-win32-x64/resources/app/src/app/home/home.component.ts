import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from '../services/requests.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  friends:User[];
  query:string = '';
  user:User;
  closeResult: string;
  friendEmail:string;
  constructor(private userService: UserService, private authenticationService:AuthenticationService,private router:Router
              , private modalService: NgbModal, private requestService: RequestsService) { 
    
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

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  sendRequest(){
    const request = {
      timestamp : Date.now(),
      receiver_email : this.friendEmail,
      sender: this.user.uid,
      status:'pending'
    };

    this.requestService.createRequest(request).then((x) =>{
      alert('solicitud enviada');
    }).catch((error) =>{
      alert('hubo un error');
      console.log('hubo un error');
    })
  }

  ngOnInit() {
  }

}
