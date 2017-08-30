import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Incident} from '../components/incidents/incident';
import AppConstants from '../constants';

@Injectable()
export class IncidentsBackendService {
  private baseUrl = `${AppConstants.BASE_URL}/api/incidents`;

  constructor(private http: Http) {}

  getIncidents(): Observable<Incident[]> {
    return this.http
      .get(`${this.baseUrl}`)
      .map(response => response.json().data);
  }

  getIncidentsByFolderId(folderId: string): Observable<Incident[]> {
    return this.http
      .get(`${this.baseUrl}?folderId=${folderId}`)
      .map(response => response.json());
  }
}
