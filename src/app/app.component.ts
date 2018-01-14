import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://api.openweathermap.org/data/2.5';
const API_KEY = '&appid=de80ca74281ccc48b732698bfed205d1';

import { Result } from './Result';
import { City } from './city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  result: Result = new Result();
  city : string;
  error: boolean = false;
  favorites: City[] = [
    new City("Genova", 3176219),
    new City("Savona", 6542009),
    new City("La Spezia",6540156),
    new City("Imperia", 3175532)
  ];

  constructor(private http: HttpClient) {
  }

  OnGetForecast(query: string) {
    this.error = false;
    this.http.get(API_URL + '/weather?' + query + '&units=metric&lang=it' + API_KEY).subscribe((data:any) => {
      // Read the result field from the JSON response.
      this.result.id = data.id;
      this.result.city = data.name;
      this.result.temperature = data.main.temp;
      this.result.tempMin = data.main.temp_min;
      this.result.tempMax = data.main.temp_max;
      this.result.condition = data.weather[0].description;
      this.result.icon = data.weather[0].icon;
    },
    (error:any) => {
      this.error = true;
      this.result = new Result();
    });    
  }

  OnGetForecastByName() {
    this.OnGetForecast('q=' + this.city);
  }

  OnGetForecastByID(cityId: number) {
    this.OnGetForecast('id=' + cityId);
  }

  OnAddFavorites() {
    this.favorites.push(new City(this.result.city, this.result.id));
  }
}
