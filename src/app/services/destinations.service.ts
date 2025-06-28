  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { UnsplashResponse } from '../models/unsplash-response.model';
  
  
  @Injectable({
    providedIn: 'root'
  })
  export class DestinationsService {
    private accessKey = '00bORbNasXiU6iQ5bkxoTHhDk9oT7CQZ4eSuPkrzlSU';
    private apiUrl = `https://api.unsplash.com/search/photos`;
  
    constructor(private http: HttpClient) {}

    getImages(destination: string): Observable<UnsplashResponse> {  
      return this.http.get<UnsplashResponse>(`${this.apiUrl}?query=${destination}&client_id=${this.accessKey}&per_page=9`);
    }
  
  }
  