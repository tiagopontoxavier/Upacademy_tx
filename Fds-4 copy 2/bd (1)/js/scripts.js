//cria base de dados (nome,versão,descrição,tamanho)
var db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
//obrigatório antes de qualquer operação na nossa base de dados
db.transaction(function (tx) {
		// elimina a tabela
	//tx.executeSql('DROP TABLE books');

	//cria a table se não existir
    tx.executeSql('CREATE TABLE IF NOT EXISTS books (id unique, opinion)');
 });



var APIKey = "AIzaSyDRlJkV6r_mlDoU-Um0kvBlQmMuwmLrhhw";
var UserID = "114548816737530918346";
var ShelfID = "1001";

function LoadData(book){
	var html = `
	<div class="book">
	<input type="hidden" class="hiddenFieldId"></input>
	<h1></h1>
	<button data-opinion="like">like me</button>
	<button data-opinion="dislike">dislike me</button>
	</div>`;
	$('.bookContainer').append(html);
	$bookHTML = $('.book').eq(-1);
	$('h1',$bookHTML).text(book.volumeInfo.title);
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
		//	tx.executeSql('INSERT INTO books(id, opinion) VALUES (?,?)', [$id,$opinion]); e a mesma coisa mas mais simples
																
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