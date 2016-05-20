
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
						if(response.respuesta)
						{
								$("#datosUsuarios").hide(); //escondemos
								$("nav").show("slow"); //mostramos
						}
						else
						{
							alert("Usuario/Contraseña incorrecto(s)");
						}
			},
			error: function(xhr,ajaxOptions,thrownError){
				console.log("ALGO SALIO MAL");
			}
		});
		console.log("se disparo el submit");
	}
	var Altas=function()
	{
			//mostramos el formulario
			$("#altaUsuarios").show("slow");
	}
	var Bajas=function()
	{
			//mostramos el formulario
			$("#bajaUsuarios").show("slow");
	}
	var AltaUsuario=function()
	{
		event.preventDefault();
		
	
		var datos=$("#frmAltaUsuarios").serialize();
		var parametros="accion=guardaUsuario&"+datos+"&id="+Math.random();

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
					if(response.respuesta)
					{
						alert("Usuario registrado correctamente");
					}
					else

					{
						alert("No se pudo guardar la información");
					}
				 },
				 error: function(xhr,ajaxOptions,thrownError){
				console.log("ALGO SALIO MAL");
			}
		});
	}
	var bajaUsuario=function()
	{
		event.preventDefault();
		
	
		var datos=$("#frmbajaUsuarios").serialize();
		var parametros="accion=bajaUsuario&"+datos+"&id="+Math.random();

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
					if(response.respuesta)
					{
						alert("Usuario eliminado correctamente");
					}
					else

					{
						alert("No se pudo guardar la información");
					}
				 },
				 error: function(xhr,ajaxOptions,thrownError){
				console.log("ALGO SALIO MAL");
			}
		});
	}
	$("#frmValidaEntrada").on("submit",validarEntrada);
	$("#btnAltas").on("click",Altas);
	("#btnBajas").on("click",Bajas);
	$("#frmAltaUsuarios").on("submit",AltaUsuario);
	$("#frmbajaUsuarios").on("submit",bajaUsuario);
}
$(document).on("ready",iniciaApp);