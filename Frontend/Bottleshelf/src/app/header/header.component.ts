import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  activateLoginComponent:boolean = false;

  constructor(private router: Router, public authService: AuthService) { }

  ngOnInit(): void {
  }
  modalLogin() {
    this.activateLoginComponent = true;
  }
  modalLoginClose() {
    this.activateLoginComponent = false;
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
