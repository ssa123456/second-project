function getRequest() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject("Microsoft.XMLHTTP");
  }
}
var arr = [];

function getImg() {
  var httpRequest = getRequest();
  httpRequest.open("GET", ip + "showImages");
  httpRequest.send();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var imgs = JSON.parse(httpRequest.responseText);
      console.log(imgs);
      for (i = 0; i < imgs.length; i++) {
        arr[i] = imgs[i].img
      }
    }
  }
}
getImg();


// 轮播函数
var count = 0;
var interval = null

function playImg() {
  document.getElementById('imgBackground').src = ip + arr[count];
  var lis = document.getElementsByClassName("liBackground");
  for (var i = 0; i < lis.length; i++) {
    if (i == count) {
      lis[i].style.backgroundColor = "white";
    } else {
      lis[i].style.backgroundColor = "#ccc";
    }
  }
  count = count + 1
  if (count == arr.length) {
    count = 0;
  }
}

function set() {
  interval = setInterval(playImg, 2000);
}
set();

function stopThis(index) {
  count = index
  playImg()
  clearInterval(interval);
  interval = null
}

function recoveryThis() {
  set();
}

function left() {
  var httpRequest = getRequest();
  httpRequest.open("GET", ip + "showADBooks");
  httpRequest.send();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var books = JSON.parse(httpRequest.responseText);
      console.log(books)
      var ul = document.getElementById("ulLeft")
      for (var i = 0; i < books.length; i++) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        var price = document.createElement('p')
        var span = document.createElement("span");
        img.src = ip + books[i].img;
        price.innerHTML='¥'+ books[i].price;
        span.innerHTML = books[i].name;
        li.appendChild(img);
        li.appendChild(price);
        li.appendChild(span);
        ul.appendChild(li);
      }
    }
  }
}
left();
function right() {
  var httpRequest = getRequest();
  httpRequest.open("GET", ip + "getBooks");
  httpRequest.send();
  httpRequest.onreadystatechange = function () {
    if (httpRequest.readyState == 4 && httpRequest.status == 200) {
      var books = JSON.parse(httpRequest.responseText);
      var ul = document.getElementById("ulRight")
      for (var i = 0; i < books.length; i++) {
        var li = document.createElement("li");
        var img = document.createElement("img");
        img.onclick = goDetails;
        var price = document.createElement('p')
        var name = document.createElement("p");
        var spanone = document.createElement("span");
        var spantwo = document.createElement("span");
        var spanthree = document.createElement("span");
        var button = document.createElement("input")
        button.onclick = joinBuyCar;
        img.src = ip + books[i].img;
        price.innerHTML='¥'+ books[i].price;
        name.innerHTML = books[i].name;
        spanone.innerHTML = "自营";
        spantwo.innerHTML ="放心购";
        spanthree.innerHTML ="秒杀" ;
        button.type= "button";
        button.value="加入购物车";
        li.appendChild(img);
        li.appendChild(price);
        li.appendChild(name);
        li.appendChild(spanone);
        li.appendChild(spantwo);
        li.appendChild(spanthree);
        li.appendChild(button);
        ul.appendChild(li);
      }
    }
  }
}
right();

function goDetails(){
  var img = event.target.src;
  var name = event.target.parentNode.firstChild.nextSibling.nextSibling.innerHTML;
  var price = event.target.parentNode.firstChild.nextSibling.innerHTML;
  var books = {name:name,price:price,img:img}
  if(localStorage.getItem("books")==null){
    var arr=[];
    arr.push(books);
    localStorage.setItem("books",JSON.stringify(arr));
  }else{
    var a=JSON.parse(localStorage.getItem("books"));
    a.push(books);
    localStorage.setItem("books",JSON.stringify(a));
  }
  window.location.href="details.html";

}
function joinBuyCar(){
  if(localStorage.getItem("username")!=null){
    alert('加入购物车成功');
    var img = event.target.parentNode.firstChild.src;
    var name = event.target.parentNode.firstChild.nextSibling.nextSibling.innerHTML;
    var price = event.target.parentNode.firstChild.nextSibling.innerHTML;
    var book={name:name,price:price,img:img}
    if(localStorage.getItem("book")==null){
      var arr=[];
      arr.push(book);
      localStorage.setItem("book",JSON.stringify(arr));
    }else{
      var a=JSON.parse(localStorage.getItem("book"));
      a.push(book);
      localStorage.setItem("book",JSON.stringify(a));
    }

  }else{
    window.location.href="login.html"
  }
  // var name = event.target.value
  // console.log(event.target.parentNode.firstChild.nextSibling.innerHTML)
}
