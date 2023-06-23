import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiGenshinStatsService {

  constructor(private httpClient: HttpClient) { }

  getAll(uid: string): Observable<any> {
    return this.httpClient.get(`http://127.0.0.1:5000/genshinstats/${uid}/all/`);
  }

  getCharacteres(uid: string): Observable<any> {
    return this.httpClient.get(`http://127.0.0.1:5000/genshinstats/${uid}/characteres/`);
  }

  getNotes(uid: string): Observable<any> {
    return this.httpClient.get(`http://127.0.0.1:5000/genshinstats/${uid}/notes/`);
  }

  getSpiralAbyss(uid: string): Observable<any> {
    return this.httpClient.get(`http://127.0.0.1:5000/genshinstats/${uid}/spiralabyss/`);
  }

  getUserStats(uid: string): Observable<any> {
    return this.httpClient.get(`http://127.0.0.1:5000/genshinstats/${uid}/userstats/`);
  }
}
