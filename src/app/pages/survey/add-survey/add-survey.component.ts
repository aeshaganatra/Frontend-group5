import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SurveyService} from "../../../services/survey.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Survey} from "../../../models/survey.model";


@Component({
  selector: 'app-add-survey',
  templateUrl: './add-survey.component.html',
  styleUrls: ['./add-survey.component.css'],
})
export class AddSurveyComponent {
  questions: any = []

  surveyForm: FormGroup = this.fb.group({
    id: new FormControl('', [Validators.required]),
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
    // questions: new FormControl('', Validators.required),
    // questions: this.fb.array(this.questions.map((question:any) => this.fb.group({
    //   question: []
    // })))

    // questions: this.FormControl.array([ this.createItem() ])
  });

  public addSurveyObj: Survey  = new Survey;
  surveys: any;

  constructor(public surveyService: SurveyService, private fb: FormBuilder, public router: Router) {}
  ngOnInit() {

   }

  get f(){
    return this.surveyForm.controls;
  }

  submit(){
    this.addSurveyObj   = new Survey();

    this.addSurveyObj.FirstName              = this.surveyForm.get('fname')!.value;
    this.addSurveyObj.LastName              = this.surveyForm.get('lname')!.value;
    this.addSurveyObj.Title              = this.surveyForm.get('title')!.value;
    this.addSurveyObj.CreatedDate        = this.surveyForm.get('createdDate')!.value;
    this.addSurveyObj.ExpiryDate         = this.surveyForm.get('expireDate')!.value;

    this.addSurveyObj.Questions = []
    const obj = {
      q1: this.surveyForm.get('q1')!.value,
      q2: this.surveyForm.get('q2')!.value,
      q3: this.surveyForm.get('q3')!.value,
      q4: this.surveyForm.get('q4')!.value,
      q5: this.surveyForm.get('q5')!.value,
    }
    this.addSurveyObj.Questions!.push(obj);
    this.surveyService.create(this.addSurveyObj).subscribe(resp=>{
      if(resp){
        this.surveys = resp
        this.router.navigateByUrl('survey/list-survey');
      }
    })
  }

}
