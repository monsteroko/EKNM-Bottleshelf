import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bottleshelf';

  constructor(
    @Inject(DOCUMENT) private document: Document
  ) {
  }

  ngOnInit(): void {
    this.document.body.classList.add('blackBG');
  }
}
