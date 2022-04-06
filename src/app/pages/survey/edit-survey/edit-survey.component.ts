import { Component, OnInit } from '@angular/core';
import {Survey} from "../../../models/survey.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SurveyService} from "../../../services/survey.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-survey',
  templateUrl: './edit-survey.component.html',
  styleUrls: ['./edit-survey.component.scss']
})
export class EditSurveyComponent implements OnInit {

  surveys: any;
  id?: number;
  survey?: any;
  surveyForm: FormGroup = this.fb.group({
    fname: new FormControl('', [Validators.required]),
    lname: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    createdDate: new FormControl('', Validators.required),
    expireDate: new FormControl('', Validators.required),
    q1: new FormControl('', Validators.required),
    q2: new FormControl('', Validators.required),
    q3: new FormControl('', Validators.required),
    q4: new FormControl('', Validators.required),
    q5: new FormControl('', Validators.required)
  });

  public editSurveyObj: Survey  = new Survey;
  constructor(
    public surveyService: SurveyService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.surveyService.refresh$.next(true);
    this.surveyService.getOneSurvey(this.id).subscribe(resp => {
      if(resp){
        this.survey = resp[0]
      }
    })

  }

  get f(){
    return this.surveyForm!.controls;
  }

  submit(){
    // const surveyIndex = this.surveyService.survey.indexOf(this.surveyService.survey.find(i => i.id = this.id))
    // this.surveyService.survey[surveyIndex] = this.survey;

    this.editSurveyObj   = new Survey();

    this.editSurveyObj.FirstName              = this.surveyForm.get('fname')!.value;
    this.editSurveyObj.LastName              = this.surveyForm.get('lname')!.value;
    this.editSurveyObj.Title              = this.surveyForm.get('title')!.value;
    this.editSurveyObj.CreatedDate        = this.surveyForm.get('createdDate')!.value;
    this.editSurveyObj.ExpiryDate         = this.surveyForm.get('expireDate')!.value;

    this.editSurveyObj.Questions = []
    const obj = {
      q1: this.surveyForm.get('q1')!.value,
      q2: this.surveyForm.get('q2')!.value,
      q3: this.surveyForm.get('q3')!.value,
      q4: this.surveyForm.get('q4')!.value,
      q5: this.surveyForm.get('q5')!.value,
    }
    this.editSurveyObj.Questions!.push(obj);

    this.surveyService.update(this.id!, this.editSurveyObj).subscribe(resp=>{
      if(resp){

        this.surveys = resp
        this.router.navigateByUrl('survey/list-survey');
      }
    })
  }

}
