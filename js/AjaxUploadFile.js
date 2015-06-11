/***
* ajax for uploadFile Object
* @author lanyue
* @QQ:1752295326
* @time 2015-06-04
*
**/
uploadFile=function(data){
	var form=new FormData();
	var xhr=XHR();
	//初始参数
	var type="POST";
	var url=data["url"]||"";
	var dataType=data["dataType"]||"json";
	var async=data["async"]||true;
	var timeout=data["timeout"]||10000;
	//非文件数据
	for(var key in data["data"]){
		if(key!="files"&&key!="file"){
			form.append(key,data["data"][key]);
		}
	}
	//多文件上传
	for(var name in data["data"]["files"]){
		for(var f in data["data"]["files"][name]){
			form.append(name+"[]",data["data"]["files"][name][f]);
		}
	}
	//单文件上传
	for(var name in data["data"]["file"]){
		form.append(name,data["data"]["file"][name]);
	}
	xhr.open(type,url,async);
	xhr.timeout=parseInt(timeout);
	//传输成功是触发事件
	xhr.onload=function(){
		if(data.onload){
			switch(dataType.toLowerCase()){
				case "json":
					data.onload(JSON.parse(xhr.responseText));
				break;
				case "text":
					data.onload(xhr.responseText);
				break;
				case "xml":
					data.onload(xhr.responseXML);
				break;
				default:
					data.onload(xhr.responseText);
				break;
			}
		}
	};
	//传输被用户取消触发事件
	xhr.onabort=function(){
		if(data.onabort)
			data.onabort(xhr);
	};
	//传输错误触发事件
	xhr.onerror=function(){
		if(data.onerror){
			var er={
				"readyState":xhr.readyState,
				"status":xhr.status,
			};
			data.onerror(er);
		}
	};
	//传输时间到
	xhr.ontimeout=function(){
		if(data.ontimeout){
			data.ontimeout(xhr);
		}
	}
	//传输开始触发事件
	xhr.onloadstart=function(){
		if(data.onloadstart){
			data.onloadstart(xhr);
		}
	};
	//传输结束触发事件
	xhr.onloadend=function(){
		if(data.onloadend){
			data.onloadend(xhr);
		}
	};
	//上传进度监控函数
	xhr.upload.onprogress=function(e){
		if(data.onprogress){
			data.onprogress(e);
		}
		//e.loaded//目前已经上传大小
		//e.totalSize//总共要上传大小
	}
	//发送
	xhr.send(form);
	//取消上传
	this.abort=function(){
		xhr.abort();
	}

	function XHR(){
		var request=false;
		//window对象中有XMLHttpRequest存在就是非IE
		if(window.XMLHttpRequest){
			request=new XMLHttpRequest();
			if(request.overrideMimeType){
				request.overrideMimeType("text/xml");
			}
		//window对象中有ActiveXObject存在就是IE低版本5 6 
		}else if(window.ActiveXObject){
			var versions=['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Msxml2.XMLHTTP.7.0','Msxml2.XMLHTTP.6.0','Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
			for(var i=0; i<versions.length; i++){
				try{
					request=new ActiveXObject(versions[i]);
					if(request){
						return request;
					}
					}catch(e){
						request=false;
					}
				}
			}
			return request;
	}
}
