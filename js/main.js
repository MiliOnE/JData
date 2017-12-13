//获取表格数据
function getData(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseText = "json";
    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(Error("数据资源加载失败，错误码:" + xhr.responseText));
      }
    };
    xhr.onerror = function() {
      reject(Error("网络错误。"));
    };
    xhr.send();
  });
}
var chartTable = document.getElementsByClassName("content-charts")[0];
var chart = echarts.init(chartTable);

//根据获取到的表格数据计算 xAxis 与 series

function drawCharts(response) {
  var key = {
    sheets: "产品内",
    class: ["日期", "Web", "Android", "iOS"]
  };
  var xAxis = [],
    singleDayData;
  var wholeData = JSON.parse(response);
  for (date in wholeData[key.sheets]) {
    if (date !== "") {
      singleDayData = wholeData[key.sheets][date];
      xAxis.push(singleDayData[key.class[0]]);
    }
  }
  console.log(xAxis);
}
getData("data/contentView.json").then(drawCharts);
