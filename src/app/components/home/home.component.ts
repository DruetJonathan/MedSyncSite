import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  loginForm:FormGroup;
  constructor(private _authServ:AuthService,private _fb : FormBuilder,private _router:Router) {
    this.loginForm = this._fb.group({
      email : [null,[Validators.required]],
      password : [null,[Validators.required]]
    });
  }
  login(){

    console.log(this.loginForm.value)
    if (this.loginForm.valid){
      this._authServ.login(this.loginForm.value).subscribe({
        next: (result) => console.log(result)
      });
      this._router.navigateByUrl("/panel")
    }
    else{
      this.loginForm.markAllAsTouched()
    }
  }
}
