function getRequest(){
  if(window.XMLHttpRequest){ 
      return new XMLHttpRequest();
  }else{
      return new ActiveXObject("Microsoft.XMLHTTP"); 
  }
}
function clickLogin(){
  var httpRequest=getRequest();
    var username=document.getElementById("username").value;
    var password=document.getElementById("password").value;
    httpRequest.open("GET",ip+"/regsterUser?username="+username+"&password="+password);
    httpRequest.onreadystatechange=function(){
        if(httpRequest.readyState==4&&httpRequest.status==200){
            localStorage.setItem("username",username);
            localStorage.setItem("password",password);
            window.location.href="index.html"
        }else{
            alert('账号密码不正确')
        }
    }
    httpRequest.send();
}