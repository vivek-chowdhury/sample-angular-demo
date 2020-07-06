import { BehaviorSubject } from 'rxjs';
import { Params, UrlSegment } from '@angular/router';

export class MockActivatedRoute {
  fragment: BehaviorSubject<string> = new BehaviorSubject('');
  url: BehaviorSubject<Array<UrlSegment>> = new BehaviorSubject<
    Array<UrlSegment>
  >([]);
  snapshot = { url: [] };
  queryParams: BehaviorSubject<object> = new BehaviorSubject<object>({});
  params: BehaviorSubject<Params> = new BehaviorSubject<Params>({});
  data: BehaviorSubject<any> = new BehaviorSubject({});
}
