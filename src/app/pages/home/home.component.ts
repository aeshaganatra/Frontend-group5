import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../services/survey.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  home = {
    title: 'Super Survey',
    subtitle: 'Ask Questions, Get Insights!',
    content: 'SuperSurvey is a survey tool, with easy to use features free of charge.',
    image: 'assets/home1.jpg'
  };


  constructor(public surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.refresh$.next(true);
  }

}

