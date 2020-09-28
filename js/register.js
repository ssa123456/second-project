//提示信息
function message(result,obj){
  var node=obj.nextElementSibling;
  if(result){
      node.style.color= "green"
      node.innerHTML="YES"
  } else{
      node.style.color= "red"
      node.innerHTML="NO"
  }
  
}

//验证账号
function changeAccount(obj){
  var f =/^([1][3578]\d{9})|(\w{2,8}@[0-9 a-z A-Z]{3,6}\.com)$/.test(obj.value);
  message(f,obj);
}
var password = "";
//验证密码
function changePassword(obj){
  password = obj.value;
  var f = /^[0-9 a-z A-Z]{8,10}$/.test(obj.value);
  message(f,obj);
}

//验证重复密码
function repeatPas(obj){
  var f = obj.value == password;
  message(f,obj);
}

function getRequest(){
  if(window.XMLHttpRequest){ 
      return new XMLHttpRequest();
  }else{
      return new ActiveXObject("Microsoft.XMLHTTP"); 
  }
}

function clickSub(){
  var judge=document.getElementsByClassName("judge");
  var count=0; 
  for(var i=0;i<judge.length;i++){
      if(judge[i].innerHTML=='YES'){
          count++;
      }
  }
  if(count==3){
    var httpRequest=getRequest();
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    httpRequest.open("GET",ip+"/regsterUser?username="+username+"&password="+password);
    httpRequest.onreadystatechange=function(){
        if(httpRequest.readyState==4&&httpRequest.status==200){
            console.log(httpRequest.responseText)
        }
    }
    httpRequest.send();
    document.forms[0].submit();
  }else{
      alert('保证每一项都填写正确在提交')
  }
}