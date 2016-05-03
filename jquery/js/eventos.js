//jquery(etiquetas, clases, id)
//$ es un alias 
//$=jquery
//CODIGO 200 ES UN OK EN PHP
var inicio=function()
{
	var clickBoton=function()
	{
		console.log("Click del botón");
		//$(".anuncioWeb").html("Click del Botón");
		//$(".anuncioWeb").append("Click del Botón");
		$.ajax({
					beforeSend:function(){
						console.log("Espere....");
					},
  					url: 'https://randomuser.me/api/',
  					dataType: 'json',
 					 success: function(data){
  												console.log(data);
  												alert(data.results[0].name.first+" "+data.results[0].name.last);
  											},
  						error:function(xhr,error,throws){
  								console.log("Ocurrio un error");
  						}
				});

	}
	var clickBoton2=function()
	{
		alert("Boton 2");
		console.log("Click del botón2");
		$.ajax({
  					url: 'https://randomuser.me/api/',
  					dataType: 'json',
 					 success: function(data){
  												console.log(data);
  											}
				});
  
	}
	//tecla 13 enter avance de linea
	//tecla 10 enter retorno de carro
	var teclaUnInput=function(tecla)
	{
		if(tecla.which== 13)
		{
			$("#otroInput").focus();
		}
	}
	//preparar los eventos  de todos mis objetos
	$("#miBoton").on("click", clickBoton);
	$("#miBoton").off("click", clickBoton2);
	$("#unInput").on("keypress",teclaUnInput);
}
//main
$(document).on("ready",inicio);
