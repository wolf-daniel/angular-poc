import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import AppConstants from '../constants';

@Injectable()
export class SnoozeBackendService {
  private baseUrl = `${AppConstants.BASE_URL}/api/snoozes`;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {}

  fetchSnooze(): Observable<string[]> {
    return this.http
      .get(`${this.baseUrl}`)
      .map(response => response.json());
  }

  getSnoozes(incidentIds: string[]): Observable<string[]> {
    const incidentIdsParam = incidentIds.join(',');
    return this.http
      .get(`${this.baseUrl}?incidentIds=${incidentIdsParam}`)
      .map(response => response.json());
  }

  snooze(incidentId: string): Observable<{}> {
    return this.http
      .post(`${this.baseUrl}`, {incidentId: incidentId}, {headers: this.headers})
      .map(response => ({}));
  }

  unsnooze(incidentId: string): Observable<{}> {
    return this.http
      .delete(`${this.baseUrl}/${incidentId}`, {headers: this.headers})
      .map(response => ({}));
  }
}
