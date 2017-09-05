import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Injectable()
export default class EventBus {
  public events: Subject<any> = new Subject();
}
