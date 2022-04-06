import { Component, OnInit } from '@angular/core';
import {Survey} from "../../../../models/survey.model";
import {SurveyService} from "../../../../services/survey.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-survey-respond',
  templateUrl: './add-survey-respond.component.html',
  styleUrls: ['./add-survey-respond.component.scss']
})
export class AddSurveyRespondComponent implements OnInit {
  id?: number;
  survey?: any;
  answers: any;
  answerSurveyObj: Survey  = new Survey;
  answerForm: FormGroup = this.fb.group({
    answer1: new FormControl('', Validators.required),
    answer2: new FormControl('', Validators.required),
    answer3: new FormControl('', Validators.required),
    answer4: new FormControl('', Validators.required),
    answer5: new FormControl('', Validators.required)
  });

  constructor(public surveyService: SurveyService,
              public router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.surveyService.getOneSurvey(this.id).subscribe(resp => {
      if(resp){
        this.survey = resp[0]
      }
    })
  }

  onSubmit(){
    this.answerSurveyObj   = new Survey();

    // this.answerSurveyObj.questions = []
    const obj =
      {
        0: {
          Q:  this.survey.Questions[0].q1,
          A: this.answerForm.get('answer1')!.value,
        },
        1: {
          Q:  this.survey.Questions[0].q2,
          A: this.answerForm.get('answer2')!.value,
        },
        2: {
          Q:  this.survey.Questions[0].q3,
          A: this.answerForm.get('answer3')!.value,
        },
        3: {
          Q:  this.survey.Questions[0].q4,
          A: this.answerForm.get('answer4')!.value,
        },
        4: {
          Q:  this.survey.Questions[0].q5,
          A: this.answerForm.get('answer5')!.value,
        }
      }
      this.answerSurveyObj.questions! = obj;
      this.answerSurveyObj.survey_id = this.survey._id

    this.surveyService.respondSurvey(this.id!, this.answerSurveyObj).subscribe(resp=>{
      if(resp){
        this.answers = resp
        this.router.navigateByUrl('survey/list-survey');
      }
    })
  }

}
