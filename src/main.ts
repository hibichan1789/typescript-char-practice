import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";

interface StudyData {
  hours: number;
  score: number;
}

const studyResults: StudyData[] = [
  { hours: 2, score: 40 },
  { hours: 5, score: 55 },
  { hours: 10, score: 65 },
  { hours: 15, score: 85 },
  { hours: 20, score: 95 }
];

const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
function init(){
  if(!canvas){
    throw new Error();
  }
  renderChart(canvas, studyResults, "学習時間とスコアの相関");
}


function setChartConfig(data:StudyData[], chartTitle:string):ChartConfiguration<"scatter">{
  const chartConfig:ChartConfiguration<"scatter"> = {
    type:"scatter",
    data:{
      datasets:[{
        data:data.map(d => ({x:d.hours, y:d.score}))
      }]
    },
    options:{
      scales:{
        x:{
          min:0,
          title:{
            display:true,
            text:"勉強時間(h)"
          }
        },
        y:{
          min:0,
          title:{
            display:true,
            text:"テスト正解率(%)"
          }
        }
      },
      plugins:{
        title:{
          display:true,
          text:chartTitle
        },
        legend:{
          display:false
        }
      }
    }
  }
  return chartConfig;
}
function renderChart(canvas:HTMLCanvasElement, data:StudyData[], chartTitle:string):void{
  const renderedChart = Chart.getChart(canvas);
  if(renderedChart){
    renderedChart.destroy();
  }
  const chartConfig = setChartConfig(data, chartTitle);
  new Chart(canvas, chartConfig);
}

window.addEventListener("DOMContentLoaded", init);