import { Component, OnInit,ViewChild  } from '@angular/core';
import {Survey} from "../../../models/survey.model";
import {SurveyService} from "../../../services/survey.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ChartType, ChartOptions,ChartData } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip,BaseChartDirective } from 'ng2-charts';
 

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.scss']
})
export class SurveyResponseComponent implements OnInit {


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  id?: number;
  survey?: any;
  answer1?: any = [];
  answer2?: any = [];
  answer3?: any = [];
  answer4?: any = [];
  answer5?: any = [];
  t1: any;
  f1: any;
  percentT1:any;
  percentF1:any;
  dataSet1:any=[];
  t2: any;
  f2: any;
  t3: any;
  f3: any;
  t4: any;
  f4: any;
  t5: any;
  f5: any;
  falseAnswer?: any;
  oneSurvey?: any;

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.surveyService.getOneSurvey(this.id).subscribe(resp => {
      if(resp){
        this.oneSurvey = resp[0]
      }
    })

    this.surveyService.getRespondSurvey(this.id!).subscribe((data: Survey[])=>{
      this.survey = data;
      // console.log(this.survey);
      this.survey.forEach((res: any)=>{
        this.answer1.push(res.questions[0].A)

        this.t1 = this.answer1.filter((t:any)=> t == "true")
        this.f1 = this.answer1.filter((f:any)=> f == "false")
        this.answer2.push(res.questions[1].A)
        this.t2 = this.answer2.filter((t:any)=> t == "true")
        this.f2 = this.answer2.filter((f:any)=> f == "false")
        this.answer3.push(res.questions[2].A)
        this.t3 = this.answer3.filter((t:any)=> t == "true")
        this.f3 = this.answer3.filter((f:any)=> f == "false")
        this.answer4.push(res.questions[3].A)
        this.t4 = this.answer4.filter((t:any)=> t == "true")
        this.f4 = this.answer4.filter((f:any)=> f == "false")
        this.answer5.push(res.questions[4].A)

        this.t5 = this.answer5.filter((t:any)=> t == "true")
        this.f5 = this.answer5.filter((f:any)=> f == "false")
        this.percentT1= parseInt(this.t1.length)/(parseInt(this.t1.length+this.f1.length))*100
        this.percentF1= parseInt(this.f1.length)/(parseInt(this.t1.length+this.f1.length))*100
        this.dataSet1 = [this.percentT1,this.percentF1];
        this.pieChartData = this.dataSet1;
     })
    })
  }

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [['True'], ['False']];
  public pieChartData: SingleDataSet =  this.dataSet1;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];






  constructor(public surveyService: SurveyService, public router: Router,
              private route: ActivatedRoute) 
              {
                monkeyPatchChartJsTooltip();
                monkeyPatchChartJsLegend(); 
              }

}


