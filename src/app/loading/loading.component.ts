import { Component, OnInit } from '@angular/core';
import { LoadingService, load } from '../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  loading: boolean = false;  
  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.loadingService.getLoading().subscribe((loa: load) => {         
      this.loading=loa.show;
  });  


  }



}
