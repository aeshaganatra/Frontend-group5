import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SurveyService} from "../../../services/survey.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              public surveyService: SurveyService) { }

  get f() { return this.registerForm.controls; }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    });
  }

  onSubmit() {

    console.log(this.registerForm)
    this.submitted = true;

    // stop here if form is invalid
    if(this.registerForm.invalid){
      return
    }

    if(this.submitted)
    {

      this.surveyService.register(this.registerForm.value).subscribe( resp => {
        if(resp){
          if(!resp){
          }
          else{
            this.router.navigate(['/login'])
          }
        }

      })



    }
    else{
      // this.error = this.registerForm.controls;
      this.router.navigate(['/register']);
    }

  }

}
