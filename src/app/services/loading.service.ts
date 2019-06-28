import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';  

export class load {    
  show: boolean;  
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading = new Subject<load>();  

  constructor() { }

  getLoading(): Observable<any> {  
    return this.loading.asObservable();  
  }  

  hideLoad(opt = false) {  
      this.showNotification(opt);  
  }  

  showLoad(opt = true) {  
      this.showNotification(opt);  
    } 
  showNotification(mostrar:boolean) {     
      this.loading.next(<load>{ show: mostrar});  
  }  

}
