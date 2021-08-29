import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api/api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  loading:boolean = true;
 

  constructor(public apiService: ApiService) { 
    this.apiService.loc$.subscribe(loc => {
      this.getData(loc);
    })
   }
  weathers$: any = new BehaviorSubject(null);

  ngOnInit() {
    setTimeout(()=>{
      this.loading = false
    }, 2000)
    this.getData(this.apiService.loc$.value);
  }
  srcIcon():string{
    return `http://openweathermap.org/img/wn/`+ this.weathers$.weather[0].icon + `@2x.png`;
  }

  getData(city: string): any {
    this.apiService.getCurrentWeather(city).subscribe(data=>{
      this.weathers$ = data;
    });
  }
}
