import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = `https://api.openweathermap.org/data/2.5`;
  apiKey = `95b12acefb8fa5bcb02b8fde4a6ae8f3`;
  cityApi = "https://api.bigdatacloud.net/data/reverse-geocode-client";
  loc$ = new BehaviorSubject('Paris');
  coordToCity$ = new BehaviorSubject(<string>'');
  clientInfo: any;


  constructor(private http: HttpClient) {   }


  getCurrentWeather(loc: string) {
    return this.http.get(`${this.apiUrl}/weather?q=${loc}&units=metric&appid=${this.apiKey}`)
  }
  buildLink(){
    navigator.geolocation.getCurrentPosition(position =>{
      this.coordToCity$.next(this.cityApi
      + "?latitude=" + position.coords.latitude
      + "&longitude=" + position.coords.longitude
      + "&localityLanguage=en");
    })
  }

  getCity(){
    return this.http.get(this.coordToCity$.value).subscribe(data=>{
      this.clientInfo = data;
      this.loc$.next(this.clientInfo.city);
    });
  }
  
}
