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

  getIncidents(folderId: string, fromIndex: number): Observable<Incident[]> {
    return this.http
      .get(`${this.baseUrl}?folderId=${folderId}&fromIndex=${fromIndex}`)
      .map(response => response.json());
  }

  getFullIncident(incidentId: string): Observable<Incident> {
    return this.http
      .get(`${this.baseUrl}/${incidentId}`)
      .map(response => response.json());
  }
}
