<!DOCTYPE html>
<html>
<head>
	<title>Books3</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/style.css">
 <link href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300" rel="stylesheet">
  
</head>

<!--<script type="text/javascript" src="js/jquery-3.2.1.js"></script>
<script type="text/javascript" href="script.js"></script>-->

<body>

<div class="dropdown">
  <button class="dropbtn">Books</button>
  <div class="dropdown-content">
    <a href="#">Arquivo</a>
    <a href="#">Histórico</a>
    <a href="#">news</a>
    <a href="#">compras</a>
    <a href="#">Registar</a>
    <a href="#">Login</a>
  </div>
  </div>
</div>
<!--<ul>
  <li><a class="#livros" href="#home">Livros</a></li>
  <li><a href="#autores">Autores</a></li>
  <li><a href="#arquivo">Arquivo</a></li>
  <li><a href="#compras">Compras</a></li>
</ul>
-->
<div class="container-fluid">
  <div class="row">

<div class="title">
<div class="active" id="Inicio">
      <button id="begin">Kundera-Cenas</button>
    </div>
  </div>

<div class="container-fluid">
	<div class="row">
      
    <div class="bookDiv"></div>

    <div class="botoes col-md-8 col-md-offset-2 col-centered">
      <button type="button" class="Like">Like</button>
      <button type="button" class="DisLike">DisLike</button>
    </div>

    <div class="Voltar">
    <div class="botoes col-md-8 col-md-offset-2 col-centered">
        <div class="center-block"><button id="voltar">Voltar</button></div>
    </div>
    </div>

  	<div id="resultados" class="col-xs-8 col-xs-offset-2">
  		<h2>Resultados</h2>
  		<br>
  		<div class="col-sm-4 col-sm-offset-2">Likes: <label id="counter"></label></div>
  		<div class="col-sm-4 col-sm-offset-2">Dislikes: <label id="counter1"></label></div>
  		<button class="col-md-8 col-md-offset-2 col-centered"id="restartButton">Inicio</button>
  	</div>
  
 	</div> 
</div>

<div class="footer">
	<footer id="name"><h3>Tiago Xavier</h3></footer>
</div>
	<script type="text/javascript" src="js/jquery-3.2.1.js"></script>
  <script type="text/javascript" src="js/scripts.js"></script>
		
</body>
</html>
  		
