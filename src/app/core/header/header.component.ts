import { IHeaderState } from './state/iheader.state';
import { headerSelector } from './state/header.reducer';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAddTaskOptionRequired: boolean;
  isLogoutRequired: boolean;

  constructor(private router: Router, private store: Store<IHeaderState>) {}

  ngOnInit(): void {
    // TODO: Need to unsubscrbe later
    this.store.select(headerSelector).subscribe((state) => {
      if (state) {
        this.isAddTaskOptionRequired = state.homeOptions.isAddTaskVisible;
        this.isLogoutRequired = state.logout.isVisible;
      }
    });
  }

  /**
   * @description
   */
  onAddTaskClicked(): void {
    alert(
      'Right now this functionality is not working but Will implement later, So stay tune !'
    );
  }

  /**
   * @description
   */
  onAboutClicked(): void {
    this.router.navigate(['/about']);
  }

  /**
   * @description
   */
  onHomeClicked(): void {
    this.router.navigate(['']);
  }
}
