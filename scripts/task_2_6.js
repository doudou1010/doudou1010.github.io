
var $ = function (id) {
      return document.getElementById(id);
    }

var input_l = $("input-l"),
	input_r = $("input-r"),
	out_l = $("out-l"),
	out_r = $("out-r"),
	num = $("input-num"),
	result = $("result");

//左侧入 按钮事件函数
function inputl(){
	var nums = getnum();
	//创建一个div元素,并设置class属性
	var createDiv=document.createElement("div");
	createDiv.setAttribute("class", "numbox");

	//如果nums存在 即用户输入了数据 则创建元素,否则不创建
	if(nums){

		var nums = document.createTextNode(nums);
		createDiv.appendChild(nums);
		
		if(result.childNodes.length !="0"){
			var first = result.firstChild;
			//alert(first+1);
			first.parentNode.insertBefore(createDiv,first);
		}
		else{			
			result.appendChild(createDiv);
		}
	}

	/*var item="";
	item = "<div class='numbox'>".."</div>";
	result.innerHTML += item;*/
}

//右侧入 按钮事件函数
function inputr(){
	var nums = getnum();
	//创建一个div元素,并设置class属性
	var createDiv=document.createElement("div");
	createDiv.setAttribute("class", "numbox");

	//如果nums存在 即用户输入了数据 则创建元素,否则不创建
	
	if(nums){

		var nums = document.createTextNode(nums);
		createDiv.appendChild(nums);

		if(result.childNodes.length !="0"){
			var last = result.lastChild;
			//alert(last+1);
			insertAfter(createDiv,last);
		}
		else{
			
			result.appendChild(createDiv);
		}
	}
	
	/*var item="";
	item = "<div class='numbox'>".."</div>";
	result.innerHTML += item;*/
}


function outl(){
	if(result.childNodes.length != "0"){
			//队列不为空就删除第一个字元素
			result.removeChild(result.firstChild);
			/*var item = "队列有"+result.childNodes.length+"个元素";
			alert(item);*/
		}
		else{
			alert("队列空");
		}
}
function outr(){
	if(result.childNodes.length != "0"){
			//队列不为空就删除最后一个字元素
			result.removeChild(result.lastChild);
			/*var item = "队列有"+result.childNodes.length+"个元素";
			alert(item);*/
		}
		else{
			alert("队列空");
		}
}

//绑定事件函数

input_r.onclick = inputr;
input_l.onclick = inputl;

out_l.onclick = outl;
out_r.onclick = outr;


//以下为事件函数调用的函数


//在一个指定元素之后插入元素的代码
function insertAfter(newElement,targetElement){
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement){
		parent.appendChild(newElement);
	}
	else{
		//targerElement是最后一个元素,nextSibling就是最后一个元素的下一个兄弟元素
		parent.insertBefore(newElement,targetElement.nextSibling);
	}
}

//获取input输入框的内容并判断输入是否规范
function getnum(){
	var nums = num.value;
	//alert(nums);
	if(!(parseInt(nums)==nums)||(!nums)){
		alert("请输入一个整数");
	}
	else{
		return nums;
	}	
}