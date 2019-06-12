import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  friends : User[];
  constructor() { 
    let usuario1: User = {
      nick: 'Eduardo',
      subnick:'Escribeme',
      age: 24,
      email: 'ed@aoe.aoe',
      friends: true,
      uid: 1,
      status:'online' // online, offline, busy, away
      };
      let usuario2: User = {
      nick: 'Freddy',
      age: 28,
      email: 'fred@aoe.aoe',
      friends: true,
      uid: 2,
      status:"offline"
      };
      let usuario3: User = {
      nick: 'Yuliana',
      age: 18,
      email: 'yuli@aoe.aoe',
      friends: true,
      uid: 3,
      status:"busy"
      };
      let usuario4: User = {
      nick: 'Ricardo',
      age: 17,
      email: 'rick@aoe.aoe',
      friends: false,
      uid: 4,
      status:"busy"
      };
      let usuario5: User = {
      nick: 'Marcos',
      age: 30,
      email:'marcos@aoe.aoe',
      friends: false,
      uid: 5,
      status:"away"
      };

      this.friends = [usuario1,usuario2,usuario3,usuario4,usuario5];
      
  }

getFrieds(){
  return this.friends;
}

}
