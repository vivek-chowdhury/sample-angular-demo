import { Subject } from 'rxjs';
import { RouterEvent } from '@angular/router';

export class MockRouter {
  events: Subject<RouterEvent> = new Subject<RouterEvent>();
  navigate(args) {}

  navigateByUrl(args) {
    return args[0];
  }
}
