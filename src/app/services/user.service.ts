import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  constructor(private angularDataBase:AngularFireDatabase) {  }

  getUsers(){
    return this.angularDataBase.list('/users');
  }
  
  getUserById(uid){
    return this.angularDataBase.object('/users/' + uid);
  }
  
  createUser(user){
    return this.angularDataBase.object('/users/' + user.uid).set(user);
  }

  editUser(user){
    return this.angularDataBase.object('/users/' + user.uid).update(user);
  }

  setAvatar(avatar, uid){
    return this,this.angularDataBase.object('/users/'+uid + '/avatar').set(avatar);
  }

}
