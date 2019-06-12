import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {
  friendId:any;
  friend: User;
  // price:number = 78.13215464651321564;
  // today:any = Date.now();
  constructor(private activateRoute:ActivatedRoute,
              private userService: UserService) { 

    this.friendId = this.activateRoute.snapshot.params['uid'];
    this.userService.getUserById(this.friendId).valueChanges()
    .subscribe((x:User) => {
      this.friend = x;
    },error => {
      console.log(error);
    });

    // this.friends = userService.getFrieds();

    // this.friend = this.friends.find((record) => {
    //   return record.uid == this.friendId;
    // })

  }

  ngOnInit() {
  }

}
