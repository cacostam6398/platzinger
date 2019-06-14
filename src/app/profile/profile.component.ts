import { Component, OnInit } from '@angular/core';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { AuthenticationService } from '../services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FirebaseStorage } from '@angular/fire';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  user:User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture:any;

  constructor(private userservice:UserService, private authenticationService:AuthenticationService, private firebaseStorage: AngularFireStorage) { 
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

  saveSettings(){

    if(this.croppedImage){
      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/'+ currentPictureId + '.jpj').putString(this.croppedImage,'data_url');
      pictures.then((fufilled)=>{
        this.picture = this.firebaseStorage.ref('pictures/'+ currentPictureId + '.jpj').getDownloadURL();
        this.picture.subscribe((p)=>{
          this.userservice.setAvatar(p,this.user.uid).then((fufilled) =>{
            alert('Avatar subido correctamente')
          }).catch((error) =>{
            alert('hubo un error subiendo le imagen');
            console.log(error)
          });
        });
      }).catch((error)=>{
        console.log(error);
      })
    }else{
      this.userservice.editUser(this.user).then((fufilled) => {
        alert('Se edito correctamente');
      }).catch((error) => {
        alert('Hubo un error')
        console.log(error)

      }) ;
   }

  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
}
imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
}
imageLoaded() {
    // show cropper
}
cropperReady() {
    // cropper ready
}
loadImageFailed() {
    // show message
}

  ngOnInit() {
  }

}
