import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { ConversationService } from '../services/conversation.service';
import { send } from 'q';
import { timestamp } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.sass']
})
export class ConversationComponent implements OnInit {
  friendId:any;
  friend: User;
  user:User;
  conversation_id:String;
  textMessage:string;

  // price:number = 78.13215464651321564;
  // today:any = Date.now();
  constructor(private activateRoute:ActivatedRoute,
              private userService: UserService,
              private conversationService : ConversationService,
              private authenticationService: AuthenticationService) { 

    this.friendId = this.activateRoute.snapshot.params['uid'];


    this.authenticationService.getStatus().subscribe((next) => {
      this.userService.getUserById(next.uid).valueChanges().subscribe((user:User) =>{
        this.user = user;
          this.userService.getUserById(this.friendId).valueChanges()
          .subscribe((x:User) => {
            this.friend = x;
            const ids = [this.user.uid,this.friend.uid].sort();
            this.conversation_id = ids.join('|');
            this.getConversations()
          },error => {
            console.log(error);
          });
      })
    })

    // this.friends = userService.getFrieds();

    // this.friend = this.friends.find((record) => {
    //   return record.uid == this.friendId;
    // })

  }

  sendMessage(){
    const message = {
      uid: this.conversation_id,
      timestamp:Date.now(),
      text: this.textMessage,
      sender: this.user.uid,
      receiver : this.friend.uid
    }
      this.conversationService.createConversation(message).then((fufilled) =>{
        this.textMessage = '';
      });
  }

  getConversations(){
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((fufilled) => {
        
    })
  }

  ngOnInit() {
  }

}
