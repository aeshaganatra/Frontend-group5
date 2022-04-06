import { Component, OnInit } from '@angular/core';
import {SurveyService} from "../../services/survey.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public surveyService: SurveyService) { }

  ngOnInit(): void {
    this.surveyService.refresh$.next(true);
  }

}
