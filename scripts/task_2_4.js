/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var $ = function (id) {
      return document.getElementById(id);
    }

var aqiData = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */


var cityin,numin;	

function addAqiData() {

	//删除空格
	//obj = obj.replace(/[\s\uFEFF\xa0\u3000]/g,'');
	
	cityin = $("aqi-city-input").value.replace(/[\s\uFEFF\xa0\u3000]/g,'');
	numin = $("aqi-value-input").value.replace(/[\s\uFEFF\xa0\u3000]/g,'');

	//该正则表达式用于判断输入的是否是文字或字母
	var reg1 = /^[\u0391-\uFFE5A-Za-z]+$/;
	
	if (!reg1.test(cityin)) {
		alert("城市名称请输入中文或字母! ");
	}
	else if(!(parseInt(numin)==numin)){
		alert("输入的数字不是整数 ");
	}
	else{
		aqiData[cityin] = numin;
	}	
}

/**
 * 渲染aqi-table表格
 */
var tbl = $("aqi-table");

function renderAqiList() {
    var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
    for(var cityin in aqiData){
        items += "<tr><td>"+cityin+"</td><td>"+aqiData[cityin]+"</td><td><button data-cityin='"+cityin+"'>删除</button></td></tr>"
    }
    // conditions ? statementA : statementB ;  conditions成立执行语句 A ,不成立执行语句 B
    tbl.innerHTML = cityin ? items : "";
}

/**
 * 渲染aqi-table表格  DOM方法
 */

/*function renderAqiList() {
	
	//销毁之前创建的元素
	// var childs = tbl.childNodes;
	// for(var i = childs.length - 1; i >= 0; i--) { 
	//   tbl.removeChild(childs[i]); 
	// }
	tbl.innerHTML = "";

	//遍历aqiData 创建表格
	for(cityin in aqiData){

		//创建元素节点
		var	tr = document.createElement("tr"),
			thandle = document.createElement("td"),
			tcity = document.createElement("td"),
			tnum = document.createElement("td"),
			tbtn = document.createElement("button");

		//创建文本节点
		var text1 = document.createTextNode(cityin),        
	        text2 = document.createTextNode(aqiData[cityin]);
	        text3 = document.createTextNode("删除");

		tcity.appendChild(text1);
		tnum.appendChild(text2);
		tbtn.appendChild(text3);

		thandle.appendChild(tbtn);
		tr.appendChild(tcity);
		tr.appendChild(tnum);
		tr.appendChild(thandle);
		tbl.appendChild(tr);
	}
}*/


/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(cityin) {
  // do sth.
  delete aqiData[cityin];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  $("add-btn").onclick = addBtnHandle;

  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  tbl.addEventListener("click", function(event){
  		  //nodename 返回的都是大写
  		  //点击的元素是button时 才会执行语句
          if(event.target.nodeName.toLowerCase() === 'button'){

          		delBtnHandle(event.target.dataset.cityin);

          		//delBtnHandle.call(null,event.target.dataset.cityin);
          	}
      })

}

init();