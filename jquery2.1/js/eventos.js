
var iniciaApp=function()
{
	var validarEntrada=function()
	{
		//nombre tablas siempre en plural
		//varchar es dinamico solamente usa los caracteres que ocupas
		//desactivar todos los eventos que no son correspondientes a esta función
		event.preventDefault();
		console.log("Se disparo el submit");
		var usuario= $("#txtUsuario").val();  //extraer valor del input
		var clave=$("#txtClave").val(); 
		//verificar nulos
		if(usuario=="")
		{
			
			alert("Teclee usuario");
			$("#txtUsuario").focus();
		}

		if(clave=="")
		{
			
			alert("Teclee clave");
			$("#txtClave").focus();
		}
		
			
			//alert("Bienvenido "+usuario);
			//dar entrada al usuario
			//$("#datosUsuarios").hide(); //escondemos
			//$("nav").show("slow"); //mostramos
				var parametros="accion=validaEntrada"+
								"&usuario="+usuario+
								"&clave="+clave+
								"&id="+Math.random();

		$.ajax({
			beforeSend:function(){
				console.log("VALIDAR AL USUARIO");

			},
			cache:false,
			type: "POST", //enviar
			dataType: "json", //recibir
			url: "php/funciones.php",
			data: parametros,
			success: function(response){

			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("ALGO SALIO MAL");
			}
		});
		console.log("se disparo el submit");
	}
	$("#frmValidaEntrada").on("submit",validarEntrada);
}
$(document).on("ready",iniciaApp);