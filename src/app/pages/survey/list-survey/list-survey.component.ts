import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../../services/survey.service";
import {Survey} from "../../../models/survey.model";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.scss']
})
export class ListSurveyComponent implements OnInit {
  isLoggedIn: boolean = false
  surveys: Survey[] = [];

  constructor(public surveyService: SurveyService, public router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')){
      this.isLoggedIn = true;
      this.surveyService.refresh$.next(true);
    }



    this.getAllList()
  }

  getAllList(){
    this.surveyService.getAll().subscribe((data: Survey[])=>{
      this.surveys = data;
    })
  }


  deleteSurvey(id: any){
    this.surveyService.delete(id).subscribe(res => {
      this.getAllList()
      this.surveyService.refresh$.next(true);
      console.log('Post deleted successfully!');
    })
  }

}
