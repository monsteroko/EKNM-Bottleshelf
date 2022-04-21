import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }

  signIn(name:any,password:any){
    this.authService.SignIn(name, password);
    var closeModalBtn = document.getElementById('add-edit-modal-close');
    if(closeModalBtn){
      closeModalBtn.click();
    }
  }
}