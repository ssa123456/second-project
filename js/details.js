function detailsThis() {
  var img = document.getElementById('img');
  console.log(img.src)
  var name = document.getElementById('name');
  console.log(name)
  var price = document.getElementById('price');
  console.log(price)
  var books = localStorage.getItem('books')
  console.log(books)
  var bookNode = JSON.parse(books);
  console.log(bookNode[0].name)
  if (books !== null) {    
    img.src = bookNode[0].img;
    name.innerHTML = bookNode[0].name;
    price.innerHTML = bookNode[0].price;
  }
}
detailsThis();

function joinCar(){
  if(localStorage.getItem("username")!=null){
    alert('加入购物车成功');
    var img = document.getElementById('img').src;
    var name = ocument.getElementById('name').innerHTML;
    var price = document.getElementById('price').innerHTML;
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
}
