
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
		<img class="center-block">
		<h1></h1>
		<a></a>		
		<p></p>	
	</div>
	
`
	jQuery.each(Livros, function(index, value) {

		$allBooks = $(".book");
		$(".bookDiv").append(HTMLtoInsert);

		$currentBook = $(".book").eq(index);

		$("h1",$currentBook).text(value.h1);
		$("img",$currentBook).attr("src",value.img);
		$("a",$currentBook).attr("href",value.a);
		$("a",$currentBook).text("Wikipedia");
		$("p",$currentBook).text(value.p);		
	});
		$(".book:first").addClass("active");
	//  $(".book").eq(0).addClass("active");	
}

loadBook();

function Inicio(){
	$("#begin").click(function(){

	$("#Inicio").hide(200);
	$(".footer").hide();
	$(".bookDiv").show();
	$(".botoes").show();
	$(".Voltar").show();

	});
}

function Fim (){

	$("#restartButton").click(function(){

	$countLike=0;
	$countDis=0;
	$("#counter").text($countLike);
	$("#counter1").text($countLike);
	$("#resultados").hide();
	$(".botoes").hide();
	$(".Voltar").hide();
	$("#Inicio").show(500);	

});
}

Inicio();
Fim();

/*
function BotaoLikeDislike(button){

	button.click(function(){
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
			
	$book.fadeOut(100,function(){
		$book.removeClass("active");
		$next.fadeIn(100,function(){
			$next.addClass("active");
			
		});
	});	
}
BotaoLikeDislike($(".botoes button.Like"));
BotaoLikeDislike($(".botoes button.DisLike"));
*/
var countLike=0;
$(".botoes button.Like").click(function(){

	$allBooks = $(".book");
	$book = $(".book.active");
	$next = $book.next(".book");

	var index = $allBooks.index($book);
	$next = $book.next(".book");;

		if (index == $allBooks.length-1) {
			$next = $allBooks.eq(0);
			$(".bookDiv").hide();
			$(".botoes").hide();
			$(".Voltar").hide();
			$("#resultados").show();
			
		}
			
	$book.fadeOut(200,function(){
		$book.removeClass("active");
		$next.fadeIn(200,function(){
			$next.addClass("active");
			
		});

	});	
	countLike++
  	$("#counter").text(countLike);
});

var countDis=0;
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
	$book.fadeOut(200,function(){
		$book.removeClass("active");
		$next.fadeIn(200,function(){
			$next.addClass("active");
			
		});
	});	

	countDis++
  	$("#counter1").text(countDis);
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

		Loadcenas(item);
        
	});

		$(".book:first-of-type").addClass("active");
	//$(".book").eq(0).addClass("active");
});

$("#voltar").click(function(){

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

	$book.fadeOut(100,function(){
		$book.removeClass("active");
		$prev.fadeIn(100,function(){
			$prev.addClass("active");
			
		});
	});	
});














