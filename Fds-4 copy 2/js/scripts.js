
var book1 = {
		h1:"A Brincadeira", 
		img: "http://www.companhiadasletras.com.br/images/livros/80182_gg.jpg",
		a:"https://en.wikipedia.org/wiki/Milan_Kundera", 		
		p: "Este livro é muito bonito....",		
	} ;
var book2 = {
		h1:"A Insustentável leveza do Ser",
		img:"http://i.huffpost.com/gadgets/slideshows/430144/slide_430144_5581288_free.gif",
		a:"https://en.wikipedia.org/wiki/Milan_Kundera", 
		p: "A young woman in love with a man torn between his love for her and his incorrigible womanizing",
	};
var book3 = {
		h1:"Amores Risíveis",
		img:"http://www.leninimports.com/milan_kundera_laughable_loves_book_cover_2a.jpg",
		a:"https://en.wikipedia.org/wiki/Milan_Kundera", 
		p:"Este livro é muito bonito....",

	};

var Livros = [book1, book2, book3];

function loadBook(){

	var HTMLtoInsert = 
`
	<div class="book col-xs-8 col-xs-offset-2"> 	
		<img class="img center-block">
		<div class="titulo>
		<h1></h1>
		</div>
		<a target="_blank" href="">Wikipedia</a>		
		<p></p>	
	</div>
	
`
	jQuery.each(Livros, function(index, value) {

		$allBooks = $(".book");
		$(".bookDiv").append(HTMLtoInsert);

		$currentBook = $(".book").eq(index);

		$("h1",$currentBook).text(value.h1);
		$("img",$currentBook).attr("src",value.img);
		$("a",$currentBook).attr("href" ,value.a);
		$("p",$currentBook).text(value.p);		
	});

		$(".book:first").addClass("active");
	//  $(".book").eq(0).addClass("active");	
}

//loadBook();

function Inicio(){

	$("#begin").click(function(){

	$("#Inicio").hide(200);
	$(".footer").hide();
	$(".bookDiv").show();
	$(".botoes").show();
	$(".Voltar").hide();

	});
}

function Fim (){

	$("#restartButton").click(function(){

	countLike=0; 
	countDis=0;
	$("#counter").text(countLike);
	$("#counter1").text(countLike);
	$("#resultados").hide();
	$(".botoes").hide();
	$(".Voltar").hide();
	$("#Inicio").show(500);	

});
}

Inicio();
Fim();

function FadeCenas(){

	$book.fadeOut(100,function(){
		$book.removeClass("active");
		$next.fadeIn(100,function(){
			$next.addClass("active");
		});
	});
}


var conta=[];
var countLike=0;
$("#counter").text(countLike);
$(".botoes button.Like").on("click",function(){

	$allBooks = $(".book");
	$book = $(".book.active");
	$next = $book.next(".book");

	var index = $allBooks.index($book);
	$next = $book.next(".book");;

		if (index == $allBooks.length-1) {
			$next = $allBooks.eq(0);
			$(".bookDiv").hide();
			$(".botoes").hide();	
			$("#resultados").show();
			
		}	
		
	conta.push("Like");
	$(".book.active").addClass("Like");
	FadeCenas();
	countLike++
  	$("#counter").text(countLike);
  	$(".Voltar").show();

	//$car= $(".book.Like");
	 
	$car= $(".book.active").find(".titulo");
	$car.clone().appendTo('#resultados')

	console.log(conta.slice(-1));

	
  	//$("#resultados").text("<h1>"+.book.h1+"</h1>")
  	
});


var countDis=0;
$("#counter1").text(countDis);
$(".botoes button.DisLike").click(function(){
	
	$allBooks = $(".book");
	$book = $(".book.active");
	$next = $book.next(".book");

	var index = $allBooks.index($book);
	$next = $book.next(".book");

		if (index == $allBooks.length-1) {
			$next = $allBooks.eq(0);
			$(".bookDiv").hide();
			$(".botoes").hide();
			$(".Voltar").hide();
			$("#resultados").show();
								
		}		

	conta.push("DisLike");
	FadeCenas();
	console.log(conta.slice(-1));

	countDis++
  	$("#counter1").text(countDis);
  	$(".Voltar").show();
})


var Apikey ="AIzaSyCqnDWuZrBYqVJcSUSSTkBzqPzgYVq7rSI";
var UserID= "114513799506838037151";
var ShelfID= "1001";

function Loadcenas(book){

	var html =`

		<div class="book col-xs-8 col-xs-offset-2"> 	
		<img class="center-block">
		<h1></h1>	
		<p></p>
		<br>
	</div>
				`
		$(".bookDiv").append(html)
		$bookHTML=$(".book").eq(-1); //ultimo_book
		$("h1",$bookHTML).text(book.volumeInfo.title);
		$("img",$bookHTML).attr("src",book.volumeInfo.imageLinks.thumbnail);
		//$("",$bookHTML).text(book.volumeInfo.title);
		$("p",$bookHTML).text(book.volumeInfo.description);
	}

$.ajax({
	
	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + Apikey

}).done(function(data){

	console.log(data);
	$.each(data.items, function(index, item) {
		
		//var book = {name:value.volumeInfo.name}

		//Loadcenas(item);
        
	});

		$(".book:first-of-type").addClass("active");
	//$(".book").eq(0).addClass("active");
});

//cria base de dados (nome,versão,descrição,tamanho)
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
//obrigatório antes de qualquer operação na nossa base de dados
db.transaction(function (tx) {
		// elimina a tabela
	//tx.executeSql('DROP TABLE books');

	//cria a table se não existir
    tx.executeSql('CREATE TABLE IF NOT EXISTS books (id unique, opinion)');
 });

var APIKey = "AIzaSyCqnDWuZrBYqVJcSUSSTkBzqPzgYVq7rSI";
var UserID = "114513799506838037151";
var ShelfID = "1001";

function LoadData(book){
	var html = `
	<div class="book col-xs-8 col-xs-offset-2"> 	
		<img class="center-block">
		<h1></h1>	
		<p></p>
		<button data-opinion="like">like me</button>
		<button data-opinion="dislike">dislike me</button>
		<br>	
	</div>`;
	$('.bookDiv').append(html);
	$bookHTML = $('.book').eq(-1);
	$("h1",$bookHTML).text(book.volumeInfo.title);
	$("img",$bookHTML).attr("src",book.volumeInfo.imageLinks.thumbnail);
		//$("",$bookHTML).text(book.volumeInfo.title);
	$("p",$bookHTML).text(book.volumeInfo.description);
	$('.hiddenFieldId',$bookHTML).text(book.id);
}

$.ajax({
	url:"https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID +"/volumes?key=" + APIKey
}).done(function(data){
	console.log(data);
	$.each(data.items,function(index,item){
		LoadData(item);
	});
	$('.book:first-of-type').addClass('active');
});

var inAnimation = false;
$('.bookContainer').on('click','.book button',function(){
	if(!inAnimation){
		inAnimation = true;
		$book = $('.book.active');

		// vamos buscar o ID ao nosso hiddenfield
		$id = $('.hiddenFieldId',$book).text();

		// vamos buscar a opinion ao nosso custom attribute
		$opinion = $(this).attr('data-opinion');

		db.transaction(function (tx) {
			//insert na table que criámos
			tx.executeSql('INSERT INTO books(id, opinion) VALUES("' + $id + '","' + $opinion + '")');
		});

		$book.fadeOut(300,function(){
			$book.removeClass('active');
			$book.next('.book').fadeIn(300,function(){
				$book.next('.book').addClass('active');
				inAnimation = false;
			});
		});
	}
});

$('#consultDb').click(function(){
	db.transaction(function (tx) {
		//buscar todos os resultados da nossa table
		tx.executeSql('SELECT * FROM books', [], function (tx, results) {
	   		$.each(results.rows,function(index,item){
	   			//output de todas as rows/todos os resultados
				console.log(item);
			});
		}, null);
	});
});

$("#fuckdelete").click(function(){

	db.transaction(function (tx) {
	tx.executeSql('DROP TABLE books');
})
})


$(".Voltar").click(function(){

	/*$allBooks = $(".book");
	$parent = $(this).parents(".book");*/
	$allBooks = $(".book");
	$book = $(".book.active");
	$next = $book.next(".book");
	var index = $allBooks.index($book);
	$prev = $book.prev(".book");
	console.log($prev);

		// if (index >= $allBooks.length-1) {
		// 	$prev = $allBooks.eq(0);
		// 	$("#resultados").hide();
		// 	$(".bookDiv").show();
		// 	$(".botoes").show();	
					
		// }

		//$("#counter").text(countLike-1);
			//$("#counter1").text(countDis-1);

if (conta.slice(-1).pop()=== "Like")
{
		conta.pop();
		countLike--;	
  		$("#counter").text(countLike);


  	var car =$(".book first-of-type").addClass("Like");	
  	console.log(car)
  		
}
else if (conta.slice(-1).pop()=== "DisLike"){

	conta.pop();
	countDis--;
  	$("#counter1").text(countDis);	
  //	$(".book").eq().addClass("DisLike");
  	
}
	$book.fadeOut(100,function(){
		$book.removeClass("active");
		$prev.fadeIn(100,function(){
			$prev.addClass("active");

});
	});

});

















