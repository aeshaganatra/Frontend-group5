import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {SurveyService} from "../../../services/survey.service";
// import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // public username: string;
  // public password: string;
  // public errorMessage: string;
  loginForm!: FormGroup;
  submitted = false;
  isLoggedIn: boolean = false



  constructor(private router: Router, public surveyService: SurveyService,
              private formBuilder: FormBuilder
              ) { }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    this.submitted = true;

    if(this.submitted)
    {
      this.surveyService.login(this.f.username.value, this.f.password.value)
        .subscribe((resp: any)=> {
          if(resp){
            if(localStorage.getItem('user')) {
              // this.toastr.success('Successfully Login', 'Success!');
              this.router.navigate(['/survey/list-survey']);
            }
          }
          else{
          }
        })

    }
  }

  // authenticate(form: NgForm): void
  // {
  //   if (form.valid)
  //   {
  //     //perform authentication
  //   }
  //   else
  //   {
  //     this.errorMessage='Form Data Invalid';
  //   }

  // }

}
