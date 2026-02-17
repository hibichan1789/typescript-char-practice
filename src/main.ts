import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";

//ほんとは環境変数で分けるべき
const apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=35.6895&longitude=139.6917&hourly=temperature_2m&timezone=Asia%2FTokyo"
interface WeatherResponse{
  hourly:{
    temperature_2m:number[];
    time:string[]
  }
}
interface Weather{
  temperature:number[],
  time:string[],
}


function setChartConfig(data:Weather):ChartConfiguration<"line">{
  const chartConfig:ChartConfiguration<"line"> = {
    type:"line",
    data:{
      labels:data.time,
      datasets:[{
        data:data.temperature,
      }]
    },
    options:{
      plugins:{
        legend:{
          display:false
        },
      },
      scales:{
        x:{
          title:{
            display:true,
            text:"時刻"
          }
        },
        y:{
          title:{
            display:true,
            text:"気温(℃)"
          }
        },
      }
    }
  }
  return chartConfig;
}

function renderTemperature(canvas:HTMLCanvasElement, data:Weather){
  const renderedChart = Chart.getChart(canvas);
  if(renderedChart){
    renderedChart.destroy();
  }
  const chartConfig = setChartConfig(data);
  new Chart(canvas, chartConfig);
}
const canvas = document.querySelector<HTMLCanvasElement>("#canvas");
async function init(){
  if(!canvas){
    return;
  }
  const response = await fetch(apiUrl);
  const result:WeatherResponse = await response.json();
  function formatWeatherResponse(response:WeatherResponse):Weather{
    return {
      temperature:response.hourly.temperature_2m,
      time: response.hourly.time.map(time => {
        return new Date(time).toLocaleString("ja-JP",{ hour: '2-digit', minute: '2-digit'});
    })
    }
  }
  const weatherInfo = formatWeatherResponse(result);
  renderTemperature(canvas, weatherInfo);
}
window.addEventListener("DOMContentLoaded", init);