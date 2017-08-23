import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Incident} from '../incidents/incident';

@Injectable()
export class IncidentsBackendService {
  private baseUrl = 'api/incidents';

  constructor(private http: Http) {}

  fetchIncidents(): Observable<Incident[]> {
    return this.http
      .get(`${this.baseUrl}`)
      .map(response => response.json().data as Incident[]);
  }
}
