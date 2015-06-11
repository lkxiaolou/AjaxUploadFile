# AjaxUploadFile
异步传输上传文件javascript库
主文件：AjaxUploadFile.js
###功能：
  1.单文件上传
  2.多文件上传
  3.普通数据提交
  4.可选返回数据json(默认)，xml,text
  5.支持XMLHttpRequest大多数事件
  6.上传超时设置
  7.取消上传
###说明：
  纯javascript编写，不依赖任何其他插件
###兼容性说明：
  由于使用到FormData伪表单对象，所以，ie10以下版本不支持
  其他浏览器高版本才支持
  
###用法
1.引用主要文件
```javascript
<script type="text/javascript" src="./js/ajaxUploadFile.js"></script>
```
2.创建对象
```javascript
var ajaxFile=new uploadFile({参数设置});
//对象有一个取消上传方法：ajaxFile.abort();
```
对于参数设置这里需要注意：
```javascript
  1.参数都是以json格式
  "key":"value",//------------普通数据（通过$_POST[key]得到）
  "file":{//------------------单文件上传
    "name":Filelist,--------文件列表（name相当于表单里的name字段，可以通过$_FILES["name"]获得）
  },
  "files":{//-----------------多文件上传
      "name":Filelist,//------文件列表（name相当于表单里的name字段，可以通过$_FILES["name"]获得）
  },
  "事件名":funciton(){//------事件处理，支持XMLHttpRequest大多数事件
  //触发事件操作
  },
```
如：
```javascript
var ajaxFile=new uploadFile({
				"url":"url",
				"dataType":"xml",
				"timeout":5000,
				"async":true,
				"data":{
					"name":"lanyue",
					"age":100,
					"sex":"男",
					//"key":"value",
					//...普通数据可以有随意多个
					//...普通数据服务器端可以通过$_POST[key]得到
					//多文件
					"files":{
						//file为name字段 后台可以通过$_FILES["file"]获得
						"file":document.getElementById("file").files//文件数组
					}
					//单文件
					/*"file":{
					   //test为name字段 后台可以通过$_FILES["test"]获得
						"test":document.getElementById("file").files[0],
					},*/
				},
        //事件
				onloadstart:function(){
					//console.log("开始上传");
				},
				onload:function(data){
					console.log(data);
					console.log(data.name);
				},
				onerror:function(er){
					console.log(er);
				},
				onabort:function(){
					//alert("取消上传");
				},
				ontimeout:function(){
					alert("上传时间到");
				},
				onloadend:function(){
					alert("上传结束");
				},
				onprogress:function(e){
					console.log(e);
				}
			});
```
  
###这里给个完整例子：
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="./js/ajaxUploadFile.js"></script>
	<script type="text/javascript">
	onload=function(){
		document.getElementById("sub").onclick=function(){
			var ajaxFile=new uploadFile({
				"url":"./up.php",
				//"dataType":"text",
				"timeout":5000,
				"async":true,
				"data":{
					"name":"lanyue",
					"age":100,
					"sex":"男",
					//多文件
					"files":{
						//file为name字段 后台可以通过$_FILES["file"]获得
						"file":document.getElementById("file").files//文件数组
					}
					//单文件
					/*"file":{
						"test":document.getElementById("file").files[0],
					},*/
				},

				onloadstart:function(){
					//console.log("开始上传");
				},
				onload:function(data){
					console.log(data);
					console.log(data.name);
				},
				onerror:function(er){
					console.log(er);
				},
				onabort:function(){
					//alert("取消上传");
				},
				ontimeout:function(){
					alert("上传时间到");
				},
				onloadend:function(){
					alert("上传结束");
				},
				onprogress:function(e){
					console.log(e);
				}
			});
		}
	}
	</script>
</head>
<body>
	<input type="file" value="" multiple="true" id="file">
	<input type="button" value="submit" id="sub">
</body>
</html>
```

注：需要在服务器环境才能出现效果
