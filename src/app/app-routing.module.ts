import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddSurveyComponent} from "./pages/survey/add-survey/add-survey.component";
import {EditSurveyComponent} from "./pages/survey/edit-survey/edit-survey.component";
import {ListSurveyComponent} from "./pages/survey/list-survey/list-survey.component";
import {HomeComponent} from "./pages/home/home.component";
import {LoginComponent} from "./pages/auth/login/login.component";
import {RegisterComponent} from "./pages/auth/register/register.component";
import {AddSurveyRespondComponent} from "./pages/survey/survey-response/add-survey-respond/add-survey-respond.component";
import {SurveyResponseComponent} from "./pages/survey/survey-response/survey-response.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'survey/list-survey', component: ListSurveyComponent },
  { path: 'survey/add-survey', component: AddSurveyComponent },
  { path: 'survey/edit-survey/:id', component: EditSurveyComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'survey/respond-survey/:id', component: AddSurveyRespondComponent },
   { path: 'survey/survey-report/:id', component: SurveyResponseComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
