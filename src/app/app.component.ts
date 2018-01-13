import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://api.openweathermap.org/data/2.5';
const API_KEY = '&appid=de80ca74281ccc48b732698bfed205d1';

import * as cities from './IT.city.list.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  results: string[];
  city: string;

  constructor(private http: HttpClient) {
    var c = cities;
  }

  OnGetForecast() {
    console.log('getting forecast ...');
    this.http.get(API_URL + '/weather?q=' + this.city + API_KEY).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
    });    
  }
  
  OnGetCities() {
    this.http.get(API_URL + '/find?lat=44.41&lon=8.93&cnt=20' + API_KEY).subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data['results'];
    });    
  }
}
