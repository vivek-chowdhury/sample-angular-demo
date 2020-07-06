import { Observable } from 'rxjs';
import { SpinnerManagerService } from './core/spinner/spinner-manager.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'crud';
  showSpinner = true;
  constructor(private spinnerManager: SpinnerManagerService) {}

  /**
   * @description
   */
  ngOnInit(): void {
    this.spinnerManager.showSpinner$.subscribe((value) => {
      this.showSpinner = value;
    });
  }
}
