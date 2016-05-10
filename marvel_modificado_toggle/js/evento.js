
//jquery(etiquetas, clases, id)
//$ es un alias 
//$=jquery
//CODIGO 200 ES UN OK EN PHP
var pagina=0;
var res;
var inicio=function()
{
	var clickBoton=function()
	{
    $("#soyDiv").empty();
    pagina=0;
		console.log("Click del botón");
	
  		if($("#nombre").val()){ 
  		var heroe=$("#nombre").val();
  		  $("#siguiente").attr("disabled", false);
          $("#anterior").attr("disabled", false);
  		event.preventDefault();
  		$.ajax({

  					url: 'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=917a152f0e410214e0bec334a3bf6128&hash=64c0db5c2d22a1c31bf436e4ecc37edd&nameStartsWith='+heroe.replace(" ","%20"),				
  					dataType: 'json',
  					Type: 'get',
 					 success: function(resultado){
 					res=resultado.data.results;
  										console.log(resultado);	
  										if(typeof resultado.data.results!=='undefined' && resultado.data.results.length>0)		
  										{
  											//alert(resultado.data.results[0].name)
  										//	$("#nombre2").val(resultado.data.results[0].name);
  												$("#11").text(resultado.data.results[pagina].name);
  												$("#12").text(resultado.data.results[pagina].description);
                         //alert(resultado.data.results[0].thumbnail.path+resultado.data.results[0].thumbnail.extension);
  											  $("#fotoHeroe").attr("src",resultado.data.results[pagina].thumbnail.path+"."+resultado.data.results[pagina].thumbnail.extension);
  										        for(i=0;i<res[pagina].comics.items.length;i++)
                                {
                                   $("#soyDiv").append("-"+res[pagina].comics.items[i].name+"<br>");
       
                                }
                        
                      }

  											else
  											{
  												alert("Dato incorrecto, no existe");
  											}	
  												
  											},
  						error:function(xhr,error,throws){
								alert("Error......");
  								console.log("Ocurrio un error");
  						}
				});	

}else
{
	alert("UPS, Esta vacio");
}


	}
	
  var next=function()
  {

      if(typeof res[pagina+1]!= 'undefined')
      {
        pagina++;
         $("#soyDiv").empty();
                          $("#11").text(res[pagina].name);
                          $("#12").text(res[pagina].description);
                          $("#fotoHeroe").attr("src",res[pagina].thumbnail.path+"."+res[pagina].thumbnail.extension);
                          for(i=0;i<res[pagina].comics.items.length;i++)
                                {
                                   $("#soyDiv").append("-"+res[pagina].comics.items[i].name+"<br>");
       
                                }
      }
    
      

  }
  var ant=function()
  {

if(typeof res[pagina-1]!= 'undefined')
      {

        pagina--;
         $("#soyDiv").empty();
                          $("#11").text(res[pagina].name);
                          $("#12").text(res[pagina].description);
                          $("#fotoHeroe").attr("src",res[pagina].thumbnail.path+"."+res[pagina].thumbnail.extension);
                          for(i=0;i<res[pagina].comics.items.length;i++)
                                {
                                   $("#soyDiv").append("-"+res[pagina].comics.items[i].name+"<br>");
       
                                }
      }
    



  }

var historietas=function()
{

     for(i=0;i<res[pagina].comics.items.length;i++)
     {
        if(typeof res[pagina].comics.items[i]!='undefined')
        {
            $("#soyDiv").append("-"+res[pagina].comics.items[i].name+"<br>");
        }
     }
}
  var desplegar=function()
  {
      $("#soyDiv").toggle();
  }
  $("#enviarMarvel").on("click", clickBoton);
  $("#siguiente").on("click", next);
  $("#anterior").on("click", ant);
  $("#botonComic").on("click", desplegar)

  }


//main
$(document).on("ready",inicio);
