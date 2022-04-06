import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, map} from "rxjs/operators";
import {Survey} from "../models/survey.model";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

   private apiURL = "https://code-warriors-backend.herokuapp.com/";
  // private apiURL = "http://localhost:3000/";
  refresh$ = new BehaviorSubject<any>(null);

  survey: any[] = []

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }



  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + 'surveylist')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getOneSurvey(id: any): Observable<any> {
    return this.httpClient.get(this.apiURL + 'surveylist/' + id);
  }

  create(survey:any) {
    return this.httpClient.post(this.apiURL + 'surveylist/add', survey);
  }

  respondSurvey(id:number, survey:any){
    return this.httpClient.post(this.apiURL + 'surveylist/survey-response-add/'+ id, survey);
  }

  getRespondSurvey(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + 'surveylist/survey-response/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id:number, survey:Survey): Observable<any> {
    return this.httpClient.post(this.apiURL + 'surveylist/edit/' + id, survey, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id:number){
    return this.httpClient.delete(this.apiURL + 'surveylist/delete/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  register(user: User){
    const url = this.apiURL + 'auth/register'
    const register = this.httpClient.post<any>(url, user);
    return register
  }

  login(username:any, password:any) {
    const url = this.apiURL + 'auth/login'
    return this.httpClient.post<User>(url, { username, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      }));
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
