import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";

interface Status{
  label:string;
  value:number;
}
const characterStatus: Status[] = [
  { label: "攻撃力", value: 80 },
  { label: "防御力", value: 60 },
  { label: "素早さ", value: 90 },
  { label: "魔法力", value: 40 },
  { label: "運", value: 70 }
];

const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
function init(){
  if(!canvas){
    return;
  }
  renderChart(canvas, characterStatus);
}

function setRadarConfig(characterStatus:Status[]):ChartConfiguration<"radar">{
  const chartConfig:ChartConfiguration<"radar"> = {
    type:"radar",
    data:{
      labels:characterStatus.map(status => status.label),
      datasets:[{
        data:characterStatus.map(status => status.value),
        backgroundColor: "rgba(160, 216, 239, 0.5)"
      }]
    },
    options:{
      scales:{
        r:{
          min:0,
          max:100
        }
      }
    }
  }
  return chartConfig;
}

function renderChart(canvas:HTMLCanvasElement, characterStatus:Status[]){
  const renderedChart = Chart.getChart(canvas);
  if(renderedChart){
    renderedChart.destroy();
  }
  const chartConfig = setRadarConfig(characterStatus);
  new Chart(canvas, chartConfig);
}

window.addEventListener("DOMContentLoaded", init);