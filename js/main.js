//获取表格数据
function getData(url, type) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.responseText = type;
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

//根据获取到的表格数据计算 xAxis 与 series

function processData(response) {
  var key = {
    sheets: "产品内",
    class: ["日期", "Web", "Android", "iOS"]
  };
  var usedData = [];
  var rawData = JSON.parse(response);
  //date 为产品内日期
  var sheetData = rawData[key.sheets];
  for (date in sheetData) {
    if (date !== "") {
      //date 日期的数据
      var singleDayData = sheetData[date];
      for (classes in singleDayData) {
        usedData[classes] = [];
      }
      console.log(usedData);
      break;
    }
  }
  for (date in sheetData) {
    if (date !== "") {
      //date 日期的数据
      var singleDayData = sheetData[date];
      for (classes in singleDayData) {
        // console.log(classes);
        // console.log(singleDayData[classes]);
        usedData[classes].push(singleDayData[classes]);
        // console.log(usedData[classes]);
        if ((classes = "日期")) {
          usedData[classes] = usedData[classes].slice(5, 10);
          // console.log(usedData[classes]);
        }
      }
      // console.log(usedData);
    }
  }
  return usedData;
}

function setConfig(data) {
  var chartTable = document.getElementsByClassName("content-charts")[0];
  var chart = echarts.init(chartTable);
  var option = {
    title: {
      text: ""
    },
    tooltip: {},
    legend: {
      data: ["Android"]
    },
    xAxis: {
      data: data["日期"].splice(5, 10)
    },
    yAxis: {},
    series: [
      {
        name: "Android",
        type: "line",
        data: data["Android"]
      }
    ]
  };
  chart.setOption(option);
}
//data url
getData("data/contentView.json", "json")
  .then(processData)
  .then(setConfig);
