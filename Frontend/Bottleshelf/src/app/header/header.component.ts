import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  main = '../../assets/logohd.png';
  second = '../../assets/logohd_selected.png';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToCocktails() {
    this.router.navigate(['/cocktails']);
  }

  navigateToLiquids() {
    this.router.navigate(['/liquids']);
  }

  navigateToDries() {
    this.router.navigate(['/dries']);
    }
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
