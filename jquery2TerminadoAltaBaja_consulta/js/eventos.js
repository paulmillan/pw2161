
var iniciaApp = function()
{
	var validarEntrada = function()
	{
	
		event.preventDefault();
		var usuario = $("#txtUsuario").val();
		var clave = $("#txtClave").val();

		if(usuario == "")
		{
			alert("Usuario Vacio");
			$("#txtUsuario").focus();
		}
		if(clave == "")
		{
			alert("Contraseña Vacia");
			$("#txtContraseña").focus();
		}
		
		var parametros="accion=validarEntrada"+
						"&usuario="+usuario+"&clave="+clave+
						"&id="+Math.random();
		$.ajax({
			beforeSend:function(){
				console.log("Validar al usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response){
				if(response.respuesta){
					$("#datosUsuario").hide();
					$("nav").show("slow");
				}
				else{
					alert("Usuario/Contraseña incorrecto(s)");
					document.getElementById('txtUsuario').value = "";
					document.getElementById('txtClave').value = "";
					$("#txtUsuario").focus();
				}
			},
			error: function(xhr, ajaxOptionx, thrownError){
				console.log("Algo salió mal");
			},

		});
		console.log("Se disparó el submit");
	}

	var Altas = function() {
		$("#consultasUsuarios").hide();
		$("#altaUsuarios").show("slow");
		$("#bajaUsuarios").hide();
		$("#altaUsuarios h2").html("Alta Usuarios");
		//desactivo la funcion de alta usuario y enciendo la funcion de baja usuario para el mismo boton
		$("#frmAltaUsuarios").on("submit",AltaUsuario);
		$("#frmAltaUsuarios").off("submit",bajaUsuario);
	}

	var bajas = function() {
		
		//$("#bajaUsuarios").show("slow");
		//$("#altaUsuarios").hide();
		$("#altaUsuarios").show("slow");
		$("#altaUsuarios h2").html("Baja Usuarios");
		//desactivo la funcion de alta usuario y enciendo la funcion de baja usuario para el mismo boton
		$("#frmAltaUsuarios").off("submit",AltaUsuario);
		$("#frmAltaUsuarios").on("submit",bajaUsuario);
	}

	var AltaUsuario = function() {

		event.preventDefault();

		var datos = $("#frmAltaUsuarios").serialize();
		var parametros = "accion=guardaUsuario&"+datos+"&id="+Math.random();

		$.ajax({
			beforeSend:function(){
				console.log("Guardar Usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response) {
				if(response.respuesta) {
					alert("Usuario registrado correctamente");
					document.getElementById('txtNombreUsuario').value = "";
					document.getElementById('txtClaveUsuario').value = "";
					document.getElementById('txtTipoDepartamento').value = "";
				}
				else {
					alert("No se pudo guardar la información");
					document.getElementById('txtNombreUsuario').value = "";
					document.getElementById('txtClaveUsuario').value = "";
					document.getElementById('txtTipoDepartamento').value = "";

				}
			},
			error: function(xhr,ajax,thrownError) {
				console.log("Algo salió mal");
			}
		});
	}


	var bajaUsuario = function() {

		event.preventDefault();

		//var datos = $("#frmAltaUsuarios").serialize();
		var datos="txtNombreUsuario="+$("#txtNombreUsuario").val();
		var parametros = "accion=bajaUsuario&"+datos+"&id="+Math.random();

		$.ajax({
			beforeSend:function(){
				console.log("Borrar Usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response) {
				if(response.respuesta) {
					alert("Usuario borrado correctamente");
					document.getElementById('txtNombreUsuario').value = "";
					document.getElementById('txtClaveUsuario').value = "";
					document.getElementById('txtTipoDepartamento').value = "";
				}
				else {
					alert("No se pudo borrar la información");
					document.getElementById('txtNombreUsuario').value = "";
					document.getElementById('txtClaveUsuario').value = "";
					document.getElementById('txtTipoDepartamento').value = "";
				}
			},
			error: function(xhr,ajax,thrownError) {
				console.log("Algo salió mal :c");
			}
		});
	}
var Consultas=function()
{$("#altaUsuarios").hide();
	$("#consultasUsuarios").show("slow");
	var parametros="accion=consultas"+"&id="+Math.random();
	$.ajax({
			beforeSend:function(){
				console.log("Consultas usuarios");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response) {
				if(response.respuesta) {
					//alert("Usuarios desplagado correctamente");
					$("#tablaConsultas").html(response.tabla);
					//$("#tablaConsultas").append(response.tabla);
				}
				else {
					alert("Erro no se pudo mostrar  la información");
					
				}
			},
			error: function(xhr,ajax,thrownError) {
				console.log("Algo salió mal :c");
			}
		});
}
var BajaDinamica=function()
{
	var usuario=$(this).attr("id");
	alert("aqui andamos c:");
	event.preventDefault();

		//var datos = $("#frmAltaUsuarios").serialize();
		var datos="txtNombreUsuario="+usuario;
		var parametros = "accion=bajaUsuario&"+datos+"&id="+Math.random();

		$.ajax({
			beforeSend:function(){
				console.log("Borrar Usuario");
			},
			cache: false,
			type: "POST",
			dataType: "json",
			url: "php/funciones.php",
			data: parametros,
			success: function(response) {
				if(response.respuesta) {
					alert("Usuario borrado correctamente");
				Consultas();
				}
				else {
					alert("No se pudo borrar la información");
					
				}
			},
			error: function(xhr,ajax,thrownError) {
				console.log("Algo salió mal :c");
			}
		});

}
	$("#frmValidaEntrada").on("submit",validarEntrada);
	$("#btnAltas").on("click",Altas);
	$("#frmAltaUsuarios").on("submit",AltaUsuario);
	$("#btnConsultas").on("click",Consultas);
	$("#btnbajas").on("click",bajas);
	//$("#frmbajaUsuarios").on("submit",bajaUsuario);
	//eventos dinamicos
	$("#tablaConsultas").on("click","button",BajaDinamica);
	//otra forma,
	//$("#tablaConsultas > button").on("click",BajaDinamica);
}

$(document).on("ready", iniciaApp);







