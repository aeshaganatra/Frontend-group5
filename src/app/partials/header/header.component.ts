import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {SurveyService} from "../../services/survey.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false
  user: any
  constructor(private router: Router, public surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.refresh$.subscribe(data =>{
      if(data){
        if(localStorage.getItem('user')){
          this.isLoggedIn = true
        }
      }
    });
    // const survey: any[] = []
    // localStorage.setItem('survey', JSON.stringify(survey))


  }

  createSurvey(){
    if(localStorage.getItem('user')){
      this.isLoggedIn = true
      this.router.navigate(['/survey/add-survey'])
    }
    else{
      this.router.navigate(['/login'])
    }
  }

  logout() {
    this.user = localStorage.removeItem('user');
    this.isLoggedIn = false
  }
}
