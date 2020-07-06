import { Observable } from 'rxjs';
import { SpinnerManagerService } from './core/spinner/spinner-manager.service';
import { Component, OnInit, AfterViewChecked } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'crud';
  showSpinner: boolean;
  constructor(private spinnerManager: SpinnerManagerService) {
    this.showSpinner = true;
  }

  ngOnInit(): void {}

  /**
   * @description
   */
  ngAfterViewChecked(): void {
    this.spinnerManager.showSpinner$.subscribe((value) => {
      this.showSpinner = value;
    });
  }
}
