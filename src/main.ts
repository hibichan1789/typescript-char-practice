import { Chart } from "chart.js/auto";
import type { ChartConfiguration } from "chart.js/auto";
interface IceCreamSales{
  month:number;
  sales:number;
}
interface IceCreamSalesInfo {
  year:number;
  monthSales:IceCreamSales[];
}
// モックデータ
const iceCreamSalesInfo1:IceCreamSalesInfo = {
  year:2026,
  monthSales:[
  {month:1, sales:120},
  {month:2, sales:150},
  {month:3, sales:200},
  {month:4, sales:180},
  {month:5, sales:250},
  {month:6, sales:300}
  ]
}
const iceCreamSalesInfo2:IceCreamSalesInfo = {
  year:2025,
  monthSales:[
  {month:1, sales:100},
  {month:2, sales:130},
  {month:3, sales:210},
  {month:4, sales:190},
  {month:5, sales:240},
  {month:6, sales:280}
  ]
}
const chartTitle = "2026年上半期,2025年上半期売上推移比較"
const salesCanvas = document.querySelector<HTMLCanvasElement>("#sales-canvas");
function getMonths(iceCreamSalesInfo:IceCreamSalesInfo):string[]{
  return iceCreamSalesInfo.monthSales.map(sales => `${sales.month}月`);
}
function getSales(iceCreamSalesInfo:IceCreamSalesInfo):number[]{
  return iceCreamSalesInfo.monthSales.map(sales => sales.sales);
}
function setIceCreamChartConfig(iceCreamSalesInfo1:IceCreamSalesInfo,iceCreamSalesInfo2:IceCreamSalesInfo, chartTitle:string):ChartConfiguration<"bar"|"line">{
  const months = getMonths(iceCreamSalesInfo1);
  const sales1 = getSales(iceCreamSalesInfo1);
  const sales2 = getSales(iceCreamSalesInfo2);
  const iceCreamChartConfig:ChartConfiguration<"bar"|"line"> = {
    type:"bar",
    data:{
      labels:months,
      datasets:[{
        label:`${iceCreamSalesInfo1.year}年`,
        data:sales1,
        backgroundColor:"#a0d8ef",
        order:2
      },
      {
        type:"line",
        label:`${iceCreamSalesInfo2.year}年`,
        data:sales2,
        backgroundColor: "#ee1133",
        order:1
      }
    ]
    },
    options:{
      scales:{
        y:{
          min:0
        }
      },
      plugins:{
        title:{
          text:chartTitle,
          display:true,
          font:{
            size:20
          }
        },
        legend:{
          display:true
        },
        tooltip:{
          callbacks:{
            label:(context)=>{
              return `${context.dataset.label}: ${context.formattedValue}個`
            }
          }
        }
      }
    }
  }
  return iceCreamChartConfig;
}
function renderChart(canvas:HTMLCanvasElement, iceCreamSalesInfo1:IceCreamSalesInfo, iceCreamSalesInfo2:IceCreamSalesInfo, chartTitle:string):void{
  const renderedChart = Chart.getChart(canvas);
  if(renderedChart){
    renderedChart.destroy();
  }
  const iceCreamChartConfig = setIceCreamChartConfig(iceCreamSalesInfo1, iceCreamSalesInfo2, chartTitle);
  new Chart(canvas, iceCreamChartConfig);
}
function init(){
  if(salesCanvas){
    renderChart(salesCanvas, iceCreamSalesInfo1, iceCreamSalesInfo2, chartTitle);
  }
}
window.addEventListener("DOMContentLoaded", init);