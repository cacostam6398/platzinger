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
  conversation:any[];
  shake:boolean = false;

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
      receiver : this.friend.uid,
      type: 'text'
    }
      this.conversationService.createConversation(message).then((fufilled) =>{
        this.textMessage = '';
      });
  }

  sendZumbido(){
    const message = {
      uid: this.conversation_id,
      timestamp:Date.now(),
      text: null,
      sender: this.user.uid,
      receiver : this.friend.uid,
      type: 'zumbido'
    }
      this.conversationService.createConversation(message).then((fufilled) =>{});
      this.doZumbido();
    }

    doZumbido(){
      const audio = new Audio('../../assets/sound/zumbido.m4a');
      audio.play();
      this.shake = true;
      window.setTimeout((hand) =>{
        this.shake = false; 
      },1000 );

    }

  getConversations(){
    this.conversationService.getConversation(this.conversation_id).valueChanges().subscribe((data) => {
        console.log(data);
        this.conversation = data;
        this.conversation.forEach((message) => {
          if (!message.seen) {
            message.seen = true;
            this.conversationService.editConversation(message);
            if(message.type == 'text'){           
            const audio = new Audio('../../assets/sound/new_message.m4a');
            audio.play();
            }else if (message.type == 'zumbido'){
              this.doZumbido();
            }

          } else {
            
          }
        } )
    },
    (error) => {
        console.log(error);
    } )
  }

  getUserNickById(id){
    if (id === this.friend.uid) {
      return this.friend.nick;
    } else {
      return this.user.nick;
    }
  }

  ngOnInit() {
  }

}
