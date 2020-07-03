import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
  onAddTaskClicked(): void {
    alert(
      'Right now this functionality is not working but Will implement later, So stay tune !'
    );
  }
}
