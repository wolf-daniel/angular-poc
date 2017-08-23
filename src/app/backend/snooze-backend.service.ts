import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class SnoozeBackendService {
  private baseUrl = 'api/snooze';
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  fetchSnooze(): Observable<string[]> {
    return this.http
      .get(`${this.baseUrl}`)
      .map(response => response.json().data.map((item: any) => item.id) as string[]);
  }

  snooze(incidentId: string): Observable<{}> {
    return this.http
      .post(`${this.baseUrl}`, {id: incidentId}, {headers: this.headers})
      .map(response => ({}));
  }

  unsnooze(incidentId: string): Observable<{}> {
    return this.http
      .delete(`${this.baseUrl}/${incidentId}`, {headers: this.headers})
      .map(response => ({}));
  }
}
