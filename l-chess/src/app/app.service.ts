import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class appService {
    timeZoneUrl = 'https://api.sunrisesunset.io/json?lat=38.907192&lng=-77.036873&timezone=UTC&date=today';

    constructor(private http: HttpClient) { }

    getConfig() {
        return this.http.get(this.timeZoneUrl)
          
      }
}