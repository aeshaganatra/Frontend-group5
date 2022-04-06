import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyRoutingModule } from './survey-routing.module';
import {AddSurveyComponent} from "./add-survey/add-survey.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { ListSurveyComponent } from './list-survey/list-survey.component';
import {BrowserModule} from "@angular/platform-browser";
import { SurveyResponseComponent } from './survey-response/survey-response.component';
import { AddSurveyRespondComponent } from './survey-response/add-survey-respond/add-survey-respond.component';


@NgModule({
  declarations: [AddSurveyComponent, EditSurveyComponent, ListSurveyComponent, SurveyResponseComponent, AddSurveyRespondComponent],
  imports: [
    CommonModule,
    SurveyRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ]

})
export class SurveyModule { }
