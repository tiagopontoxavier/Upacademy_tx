
//-----------ELEMENTOS HTML--------------------------------------//

function LoadBooks() {

var clientID = "813842311915-0f78t2dfpsdab2829o7a0c32if99afee.apps.googleusercontent.com";

var APIkey = "AIzaSyC6f596A6x4SmCSiAhZ-BrM9_UZ5czZSGg";

var ShelfID = "1001";  //bookshelf nova (no url a seguiras_coll)

var UserID = "117214680027185876068";


	$.ajax({
	
		url: "https://www.googleapis.com/books/v1/users/" + UserID + "/bookshelves/" + ShelfID + "/volumes?key=" + APIkey   //virgula pq e'um array

	}).done(function(data){

		console.log(data);

		$.each(data.items, function(index, item){


			var HTMLtoInsert = `
				<div class="book col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3" id="book1">
 					<div>	
 						<div class="cover">
 							<a class="imglink" target="_blank" href=""><img class="imgadjust img" src=""></a>	
 							<h1></h1>
 						</div>
 					</div>
 					<div class="text">				
 						<div class="booktext">
 							<p class="description"></p>
 										
 							<div class="authorsection">
 								<span class="glyphicon glyphicon-book"></span>
 							 	<span class="authorsresults"></span>
 							</div>
 							
 							<div class="ratingsection">
 			 					<span class="glyphicon glyphicon-star-empty"></span>
 			 					<span class="averagerating"></span>	
  							</div>		

 						</div>
 						 																			
 						<div class="links">
 							<a target="_blank" class="linklivros preview" href="">Preview</a>	

 							<a target="_blank" class="linklivros googleplay" href="">Buy on Google Play 
 								<span class="priceresults"></span>
 								
 							</a>						
 											
 						</div>

					</div>
 				</div>
			`;

			
			$(".bookDiv").append(HTMLtoInsert);
			$currentBook = $(".book").eq(index);

			$("h1", $currentBook).html(item.volumeInfo.title);	
			$(".description", $currentBook).html(item.volumeInfo.description);
			$(".imgadjust", $currentBook).attr("src",item.volumeInfo.imageLinks.thumbnail);
			$(".authorsresults", $currentBook).html(item.volumeInfo.authors);
			$(".googleplay", $currentBook).attr("href",item.saleInfo.buyLink);
			$(".preview", $currentBook).attr("href",item.volumeInfo.previewLink);
			$(".averagerating", $currentBook).html(item.volumeInfo.averageRating);

			$(".imglink", $currentBook).attr("href",item.volumeInfo.previewLink);
			// $(".priceresults", $currentBook).html(item.saleInfo.listPrice.amount);

			// $(".publicationdate", $currentBook).html(item.volumeInfo.publishedDate);





 			// HTML
 			// <div class="publicationdatesection">
 			// <span>Publication date: </span>
 			// <span class="publicationdate"></span>	
 			// </div>	

 			//


		});
});

};

LoadBooks();


// MY BOOKSHELF LINK https://www.googleapis.com/books/v1/users/117214680027185876068/bookshelves/1001/volumes?key=AIzaSyC6f596A6x4SmCSiAhZ-BrM9_UZ5czZSGg


//----------------------------------------------------------------//

//----------CONJUNTO FUNCOES CLICK LIKE/DISLIKE: TRANSIÇAO BOOKS + ADICIONAR À LISTA FINAL NA LAST PAGE------//

$parent = $(".book.active");
$next = $parent.next(".book");
$lastpage = $(".lastpage");



function BookTransitiontoLastPage(){		//quando é o last book (vai para lastpage e desaparecem os butoes)
	$parent.fadeOut(50, function(){
			$parent.removeClass("active");
			$(window).scrollTop(0);

			$lastpage.fadeIn(300, function(){
				$lastpage.addClass("active");
					inAnimation = false;
			});		

			$(".buttonsLD").fadeOut(50, function(){
				$(".buttonsLD").removeClass("active");
			});

			// $('.recommendations').addClass("active");
			$('.otherrecom').addClass("active");

		});
};

//-----//

function BookTransition(){				//entre books (vai para o next book)
	$parent.fadeOut(50, function(){					//colocar delay(100)
		$parent.removeClass("active");

			$(window).scrollTop(0);

		$next.fadeIn(300, function(){
			$next.addClass("active");
			inAnimation = false;	

		});
	});
};

//-----//

function AddToLikes(){					//adiciona cover à lista dos likes
	$cover = $parent.find('.imglink');
	$cover.clone().appendTo('.listalikes');
	$('.listalikes').find('.imgadjust').css("max-height","200px").css("margin-top","30px").css("margin-bottom","30px");
};

//-----//

function AddToDislikes(){				//adiciona cover à lista dos dislikes
		$cover = $parent.find('.imglink');
		$cover.clone().appendTo('.listadislikes');
		$('.listadislikes').find('.imgadjust').css("max-height","200px").css("margin-top","30px").css("margin-bottom","30px");
};

//-----//

var islike = false;
var inAnimation = false;
var registolikes = []; //array likes


function ClickLike(){				//qdo clicka like (adiciona à lista likes + transita para o next book/lastpage)

	$("button.btnlike").click(function(){

		var islike = true;
		registolikes.push(true);

	if(!inAnimation){	
	
		inAnimation = true;
		$parent = $(".book.active");
		$next = $parent.next(".book");
		$lastpage = $(".lastpage");
	
			AddToLikes();
			ReporCorStar();

		if ($parent.index() == $(".book").length-1){
		
			BookTransitiontoLastPage();
			//inAnimation = false;	
	
		}else{

			BookTransition();	
			//inAnimation = false;	

		};
	};
});
};

ClickLike();

//-----//


var inAnimation = false;
var islike = false;

function ClickDislike(){			//qdo clicka dislike (adiciona à lista dislikes + transita para o next book/lastpage)

	$("button.btndislike").click(function(){

	var islike = false;
	registolikes.push(false);

	if(!inAnimation){	
	
		inAnimation = true;
		$parent = $(".book.active");
		$next = $parent.next(".book");
		$lastpage = $(".lastpage");
	

		ReporCorStar();
		AddToDislikes();

		if ($parent.index() == $(".book").length-1){	//se last book
		
			BookTransitiontoLastPage();
			inAnimation = false;

		}else{

			BookTransition();
			inAnimation = false;
		};
	};

});
};

ClickDislike();

//-----------------------------------------------------------------------//
	
//-------------------VOLTAR AO LIVRO ANTERIOR-----------------//

var islike = false;

function ClickBackLike(){			

	$("button.backlike").click(function(){

	$parent = $(".book.active");
	$previous = $parent.prev(".book");


		if (islike = true){
			registolikes.pop();

			$(".listalikes a:last-of-type").remove();
		}else{
			$(".listadislikes a:last-of-type").remove();
		};


		if ($parent.index() == $(".book").index(0)){	//se first book    experimeentar ao contrario com SE o index for >0
			$(".backlike").css("color","white");				
		}else{
			BookTransitionPrevious();
			ReporCorStar();
		};
		 	
});
};

ClickBackLike();


function BookTransitionPrevious(){				//entre books (vai para o prev book)
	$parent = $(".book.active");
	$previous = $parent.prev(".book");

	$parent.fadeOut(50, function(){
		$parent.removeClass("active");

			$(window).scrollTop(0);

		$previous.fadeIn(300, function(){
			$previous.addClass("active");

		});
	});
};



//-------------CONTADOR LIKES----------------------------------------// corrigir por causa do voltar pa tras um livro!!!!!!!!

function ContadorLikes() {

var counterlike = 0;
$('.likecounter').text(counterlike);

var counterdislike = 0;
$('.dislikecounter').text(counterdislike);


$('button.btnlike').click(function() {
		counterlike++;
		$('.likecounter').text(counterlike);
		
		// if (counterlike >=2) {
		// $('.recommendations').addClass("active");
		// };
	});


$('button.btndislike').click(function() {
		counterdislike++;
		$('.dislikecounter').text(counterdislike);
		
		// if (counterdislike >=2) {
		// $('.otherrecom').addClass("active");
		// };
	});


//TRY AGAIN BUTTON//
$('.backbtn').click(function() {
		counterdislike=0; //reset ao contador qdo try again
		counterlike=0;
		$('.likecounter').text(counterlike);
		$('.dislikecounter').text(counterdislike);

		$('.otherrecom').removeClass("active");
		$('.recommendations').removeClass("active");
		$('.listalikes').empty();
		$('.listadislikes').empty();
	});
}

ContadorLikes();
//-------------------------------------------//


//-------------ANIMAÇÃO SETAS-----------------------------//

function animate(){
	$('.left').fadeTo(25,1).delay(250).fadeTo(25,0.1);
	$('.middle').delay(250).fadeTo(25,1).delay(250).fadeTo(25,0.1);
	$('.right').delay(500).fadeTo(25,1).delay(250).fadeTo(25,0.1);
}

setInterval(animate,1000);

window.onload = animate(); //para começar logo na pagina inicial e nao ter o delay das setas que tinha antes

//--------------------------------------------------------//


//---------------PRESS TRY AGAIN-------------------------//

function TryAgain(){

$(".backbtn").click(function(){

		$lastpage = $(".lastpage");
		// $firstbook = $(".book").eq(0);
		$conjuntobuttons = $(".buttonsLD");
		$startpage = $(".start");

		ReporCorStar();
	
		$lastpage.fadeOut(50, function(){
			$lastpage.removeClass("active");

			$(window).scrollTop(0);
	
			$startpage.fadeIn(300, function(){
				$startpage.addClass("active");
			});

			$conjuntobuttons.fadeOut(0, function(){
				$conjuntobuttons.addClass("active");
			});

		});
});
}

TryAgain();

//---------------------------------------------------//

//--------------PRESS START--------------------------//

function Start(){

$(".pstart").click(function(){

		$firstbook = $(".book").eq(0);
		$startpage = $(".start");
		$conjuntobuttons = $(".buttonsLD");



			$startpage.fadeOut(50, function(){
				$startpage.removeClass("active");

				$(window).scrollTop(0);
	
				$firstbook.fadeIn(300, function(){
					$firstbook.addClass("active");
				});

		// $(".book").eq(0).addClass("active");

				$conjuntobuttons.fadeIn(0, function(){
					$conjuntobuttons.addClass("active");
				});
			});
});
}

Start();

//-------------------------------------------------//

//------------ACEDER AOS FAVORITOS----------//

function ClickFavs(){

	$(".navstar").click(function(){

		$active = $(".active");

		$(window).scrollTop(0);

		$active.fadeOut(50, function(){
			$active.removeClass("active");

				$(window).scrollTop(0);

				$(".favorites").fadeIn(0, function(){
				$(".favorites").addClass("active");
				});
			});
});
};

ClickFavs();

//-------------------------------------//

//---------ADICIONAR AOS FAVORITOS qdo clicka star-------//

function AddToFavs(){	

	$(".star").click(function(){

	$parent = $(".book.active");
	$cover = $parent.find('.imglink');
	$(".likestar.glyphicon-star").css("color","#099FFF");

	$cover.clone().appendTo('.favspage');
	$('.favspage').find('.imgadjust').css("max-height","200px").css("margin-top","30px").css("margin-bottom","30px").css("display", "inline-block").css("margin","20px");
	});
};

AddToFavs();

// $(".star").toggle(function(){    //esta.me a esconder a star em vez d alternar a funcao a correr

// 		$cover.clone().appendTo('.favspage');
// 		$('.favspage').find('.imgadjust').css("max-height","200px").css("margin-top","30px").css("margin-bottom","30px").css("display", "inline-block").css("margin","20px");
	
// 	}, function() {
// 		$(".favspage").find(".imglink").remove();
		
// });




// function RemoveFromFavs(){

// 	$(".star").click(function(){
	
// 		$$parent = $(".book.active");
// 		$cover = $parent.find('.imglink');
	
// 		$('.favspage').find($cover).remove();

// 	});
// };

// RemoveFromFavs();




//-----//


function ReporCorStar(){				//repor cor inicial da star qdo transita para o next book
$(".likestar.glyphicon-star").css("color","white");
};


//------------------------------------------------------//




//-------------RELOAD page onclick menu tinderbook--------------------------//


$(".reloadpage").click(function(){
	 window.location.reload();
 });














