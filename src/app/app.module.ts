import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ConversationComponent } from './conversation/conversation.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes, RouterModule } from '@angular/router';
import { convertActionBinding } from '@angular/compiler/src/compiler_util/expression_converter';
import { MenuComponent } from './menu/menu.component';
import { SearchPipe } from './pipes/search';
import { FormsModule } from '@angular/forms'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { environment } from '../environments/environment';
import { AuthenticationGuard } from './services/authentication.guard';
import { ImageCropperModule } from 'ngx-image-cropper';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import { RequestComponent } from './modals/request/request.component';
import { ContactComponent } from './contact/contact.component';
import { NgxLoadingModule } from 'ngx-loading';
import { LoadingComponent } from './loading/loading.component';
import { LoadingService } from './services/loading.service';
const appRoutes:Routes = [
  {path:'', component:LoginComponent},
  {path:'home', component: HomeComponent,canActivate:[AuthenticationGuard]},
  {path:'login', component: LoginComponent},
  {path:'conversation/:uid', component: ConversationComponent},
  {path:'profile', component: ProfileComponent,canActivate:[AuthenticationGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ConversationComponent,
    ProfileComponent,
    MenuComponent,
    SearchPipe,
    RequestComponent,
    ContactComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    // AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    AngularFireDatabaseModule,
    ImageCropperModule,
    NgbModule,
    BootstrapModalModule.forRoot({container:document.body}),
    NgxLoadingModule.forRoot({})
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents:[RequestComponent]
})
export class AppModule { }
