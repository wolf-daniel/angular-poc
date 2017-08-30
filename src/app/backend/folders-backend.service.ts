import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Folder} from '../components/folders/folder';
import AppConstants from '../constants';

@Injectable()
export class FoldersBackendService {
  private baseUrl = `${AppConstants.BASE_URL}/api/folders`;

  constructor(private http: Http) {}

  getFolders(): Observable<Folder[]> {
    return this.http
      .get(`${this.baseUrl}`)
      .map(response => response.json());
  }
}
