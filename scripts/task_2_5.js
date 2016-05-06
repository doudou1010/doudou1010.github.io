/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

var colorarr = [
  '#996699','#CCCC99','#CCCC99','#FF9999','#996699','#996666'
];

function randomcolor(){
  var i = Math.floor(Math.random()*7);
  return colorarr[i];
}

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

  initAqiChartData();

  var item = "";
  chart.innerHTML = item;

  var inittime = chartData.time;
  var initdata = chartData.data;
  
  for (var i = 0; i < initdata.length; i++) {
    var info = inittime[i] +"  空气质量:"+initdata[i];
    createElement(initdata[i],pageState.nowGraTime,info);
  }

/*  var chart = document.getElementById("chart");
  var item = "";
  var inittime = chartData.time;
  var initdata = chartData.data;
  for (var i = 0; i < initdata.length; i++) {
    item += "<div class='flexbox' ></div>";
  }
  chart.innerHTML = item;*/
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(nowselect) {
  // 确定是否选项发生了变化 
  var currentradio = nowselect;
  var beforeradio = pageState.nowGraTime;
  if (currentradio!=beforeradio) {

    // 设置对应数据
    pageState.nowGraTime = currentradio;
    //alert(pageState.nowGraTime);
    // 调用图表渲染函数
    renderChart();
  }
  
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化
  // 当前选中的option的值 selectedIndex 是索引 从 0 开始
  var currentselect = cityselect.options[cityselect.selectedIndex].text;
  // 设置对应数据
  pageState.nowSelectCity = currentselect;
  //alert(pageState.nowSelectCity);

  // 调用图表渲染函数
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */

function initGraTimeForm() {
  var formtime = document.getElementById("form-gra-time");
  dwm = document.getElementsByName("gra-time");

  formtime.addEventListener("click", function(event){
        //nodename 返回的都是大写
        //点击的元素是button时 才会执行语句
          if(event.target.type === 'radio'){
              graTimeChange(event.target.value);
            }
    })
  

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
var cityselect = document.getElementById("city-select");
function initCitySelector() {

  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  var item = "";
  var keys = [];
  for(var key in aqiSourceData){
    if (aqiSourceData.hasOwnProperty(key) === true){  
            keys.push(key);              
      }                 
    }
  for (var i = 0; i < keys.length; i++) {
    item +='<option value="'+keys[i]+'">'+keys[i]+"</option>";
    pageState.nowSelectCity = keys[0];
  }
  cityselect.innerHTML = item;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  //citySelect选中的值没有发生改变时不会触发onchange
  cityselect.onchange = citySelectChange;
    
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  
  var nowcity = pageState.nowSelectCity;
  var nowtime = pageState.nowGraTime;
  var randomDataObj = aqiSourceData[nowcity];

  var timeArr = [];
  var randomDataArr = [];
  for(var key in randomDataObj){
    if (randomDataObj.hasOwnProperty(key) === true){  
          timeArr.push(key);      
      }
  }
  var lens = timeArr.length;
  var timekey;

  if(nowtime=='day'){
    //每天的空气质量
    for (var i = 0; i< lens; i++) {
      timekey = timeArr[i];
      randomDataArr.push(randomDataObj[timekey]);
    }
  }
  else if (nowtime=='week'){
    //每周的空气质量    
    var avrweek=0;
    for (var i = 0; i < lens;) {

        var data=0;

        for(var j=0;j<7;j++){
          //依次提取出七天的数据取平均数
          timekey = timeArr[i];
          var t = randomDataObj[timekey];
          data +=t;                   
          i++;
        }
        if(data){
          avrweek = Math.round(data/7);
          randomDataArr.push(avrweek);  
        }
        
      }
  }
  else if(nowtime == 'month'){
    var avrmonth=0;
    for (var i = 0; i < lens;) {

        var data=0;

        for(var j=0;j<30;j++){
          //依次提取出30天的数据取平均数
          timekey = timeArr[i];
          var t = randomDataObj[timekey];
          data +=t;                   
          i++;
        }
        if(data){
          avrmonth = Math.round(data/30);
          randomDataArr.push(avrmonth); 
        }         
      }
  }

  // 处理好的数据存到 chartData 中
  chartData.data = randomDataArr;
  chartData.time = timeArr;
  //alert(timeArr); 
}


/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/
function createElement(data,seed,time){ 
  var chart = document.getElementById("chart")
  var createDiv=document.createElement("div"); 
  createDiv.style.background=randomcolor();
  createDiv.style.height=data;
  //createDiv.setAttribute("transition","height 2s");
  if(seed=='day'){
    createDiv.setAttribute("class", "flexbox day");
    createDiv.setAttribute("title", time);
  }
  if (seed=='week') {
    createDiv.setAttribute("class", "flexbox week");
  }
  if (seed=='month') {
    createDiv.setAttribute("class", "flexbox month");
  }
  chart.appendChild(createDiv); 
} 

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();



/*
  没仔细实现的部分
  1.计算每个周和每个月的时候应该提取日期来计算


 */