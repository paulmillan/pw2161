
//jquery(etiquetas, clases, id)
//$ es un alias 
//$=jquery
//CODIGO 200 ES UN OK EN PHP

var inicio=function()
{
	var clickBoton=function()
	{
   
		console.log("Click del botón");
	
  		if($("#nombre").val()){ 
  		var heroe=$("#nombre").val();
$('#tabla3').empty()
  		event.preventDefault();
  		$.ajax({

  					url: 'http://gateway.marvel.com/v1/public/characters?ts=1&apikey=917a152f0e410214e0bec334a3bf6128&hash=64c0db5c2d22a1c31bf436e4ecc37edd&nameStartsWith='+heroe.replace(" ","%20"),				
  					dataType: 'json',
  					Type: 'get',
 					 success: function(resultado){
 					
  										console.log(resultado);	
  										if(typeof resultado.data.results!=='undefined' && resultado.data.results.length>0)		
  										{
                 

                          for(i=0;i<resultado.data.results.length;i++)
                          {
                            var img=resultado.data.results[i].thumbnail.path+"."+resultado.data.results[i].thumbnail.extension;
                             $("#tabla3").append( '<tr>' );
                              $("#tabla3").append( '<td>' + resultado.data.results[i].name+'</td>' );
                              $("#tabla3").append( '<td>' + resultado.data.results[i].description+'</td>' );
                              $("#tabla3").append( '<td>' + '<img src='+img+' '+' alt="">'+'</td>' );
                              $("#tabla3").append( '</tr>' );
                             
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
	
  

  
  $("#enviarMarvel").on("click", clickBoton);
 
  }


//main
$(document).on("ready",inicio);
