import { Component, OnInit,QueryList, ViewChildren  } from '@angular/core';
import {Survey} from "../../../models/survey.model";
import {SurveyService} from "../../../services/survey.service";
import {ActivatedRoute, Router} from "@angular/router";
import { ChartType, ChartOptions,ChartData } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip,BaseChartDirective } from 'ng2-charts';
import * as Chart from 'chart.js';
 

@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.scss']
})
export class SurveyResponseComponent implements OnInit {


  @ViewChildren(BaseChartDirective) charts:  QueryList<BaseChartDirective> | undefined; 

  id?: number;
  survey?: any;
  question1?:any;
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
  percentT2:any;
  percentF2:any;
  dataSet2:any=[];
  t3: any;
  f3: any;
  percentT3:any;
  percentF3:any;
  dataSet3:any=[];
  t4: any;
  f4: any;
  percentT4:any;
  percentF4:any;
  dataSet4:any=[];
  t5: any;
  f5: any;
  percentT5:any;
  percentF5:any;
  dataSet5:any=[];
  falseAnswer?: any;
  oneSurvey?: any;

  canvas1: any;
  ctx1:any;
  canvas2:any;
  ctx2:any;
  canvas3:any;
  ctx3:any;
  canvas4:any;
  ctx4:any;
  canvas5:any;
  ctx5:any;

  ngOnInit(){
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
        this.pieChartData1 = this.dataSet1;

        this.percentT2= parseInt(this.t2.length)/(parseInt(this.t2.length+this.f2.length))*100
        this.percentF2= parseInt(this.f2.length)/(parseInt(this.t2.length+this.f2.length))*100
        this.dataSet2 = [this.percentT2,this.percentF2];
        this.pieChartData2 = this.dataSet2;
       

        this.percentT3= parseInt(this.t3.length)/(parseInt(this.t3.length+this.f3.length))*100
        this.percentF3= parseInt(this.f3.length)/(parseInt(this.t3.length+this.f3.length))*100
        this.dataSet3 = [this.percentT3,this.percentF3];
        this.pieChartData3 = this.dataSet3;
      

        this.percentT4= parseInt(this.t4.length)/(parseInt(this.t4.length+this.f4.length))*100
        this.percentF4= parseInt(this.f4.length)/(parseInt(this.t4.length+this.f4.length))*100
        this.dataSet4 = [this.percentT4,this.percentF4];
        this.pieChartData4 = this.dataSet4;
      

        this.percentT5= parseInt(this.t5.length)/(parseInt(this.t5.length+this.f5.length))*100
        this.percentF5= parseInt(this.f5.length)/(parseInt(this.t5.length+this.f5.length))*100
        this.dataSet5 = [this.percentT5,this.percentF5];
        this.pieChartData5 = this.dataSet5;
     
     })
    })


    /*
    this.canvas1 = document.getElementById('myChart1');
    this.ctx1 = this.canvas1.getContext('2d');

    let myChart1 = new Chart(this.ctx1, {
      type: 'pie',
      data: {
          labels: ["True","False"],
          datasets: [{
              //label: '# of Votes',
              data: this.dataSet1,
              //borderWidth: 5
          }]
      },
      options: {
        responsive: false,
        //display:true
      }
    });


    //chart 2
    this.canvas2 = document.getElementById('myChart2');
    this.ctx2 = this.canvas2.getContext('2d');

    let myChart2 = new Chart(this.ctx2, {
      type: 'pie',
      data: {
          labels: ["True","False"],
          datasets: [{
              label: '# of Votes',
              data: this.dataSet2,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        //display:true
      }
    });


    //chart3
    this.canvas3 = document.getElementById('myChart3');
    this.ctx3 = this.canvas3.getContext('2d');

    let myChart3 = new Chart(this.ctx3, {
      type: 'pie',
      data: {
          labels: ["True","False"],
          datasets: [{
              label: '# of Votes',
              data: this.dataSet3,
              backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
        responsive: false,
        //display:true
      }
    });   */

  }

  public pieChartData2: SingleDataSet =  this.dataSet2;
  public pieChartData3: SingleDataSet =  this.dataSet3;
  public pieChartData4: SingleDataSet =  this.dataSet4;
  public pieChartData5: SingleDataSet =  this.dataSet5;
  public pieChartOptions: ChartOptions = {responsive: false,};
  public pieChartLabels: Label[] = [['True'], ['False']];
  public pieChartData1: SingleDataSet =  this.dataSet1;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];



  constructor(public surveyService: SurveyService, public router: Router,
              private route: ActivatedRoute) 
              {
                //monkeyPatchChartJsTooltip();
                //monkeyPatchChartJsLegend(); 
              }

}


